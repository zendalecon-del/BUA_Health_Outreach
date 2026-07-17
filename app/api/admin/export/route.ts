import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { getPortalProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

function sheet(workbook: ExcelJS.Workbook, name: string, rows: Record<string, unknown>[]) {
  const ws=workbook.addWorksheet(name,{views:[{state:"frozen",ySplit:1}]});
  if(!rows.length){ws.addRow(["No records"]);return ws;}
  const headers=Object.keys(rows[0]);ws.columns=headers.map((key)=>({header:key,key,width:Math.min(42,Math.max(14,key.length+2))}));
  rows.forEach((row)=>ws.addRow(row));ws.getRow(1).font={bold:true,color:{argb:"FFFFFFFF"}};ws.getRow(1).fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF17243A"}};ws.autoFilter={from:{row:1,column:1},to:{row:1,column:headers.length}};return ws;
}

export async function GET(){
  const profile=await getPortalProfile();if(profile?.role!=="administrator")return NextResponse.json({error:"Not authorised."},{status:403});
  const db=createAdminClient();
  const [participants,screenings,referrals,followUps,staff]=await Promise.all([
    db.from("participants").select("*").order("created_at"),
    db.from("screenings").select("*,participants(registration_number,full_name)").order("created_at"),
    db.from("referrals").select("*,participants(registration_number,full_name),referral_hospitals(name)").order("created_at"),
    db.from("follow_ups").select("*,participants(registration_number,full_name)").order("created_at"),
    db.from("staff_profiles").select("staff_id,full_name,email,phone,role,active,credential_sent_at,last_seen_at,created_at").order("created_at"),
  ]);
  const workbook=new ExcelJS.Workbook();workbook.creator="BUA Health Outreach";workbook.created=new Date();
  const participantRows=(participants.data??[]).map((p:any)=>({registration_number:p.registration_number,full_name:p.full_name,gender:p.gender,age:p.age,phone:p.phone,email:p.email,department:p.department,other_department:p.other_department,medical_conditions:(p.medical_conditions??[]).join("; "),taking_medication:p.taking_medication,medication_details:p.medication_details,smoking_status:p.smoking_status,alcohol_use:p.alcohol_use,health_concern:p.health_concern,requested_service:p.requested_service,medical_contact_permission:p.medical_contact_permission,wellness_information_permission:p.wellness_information_permission,consent_accepted:p.consent_accepted,registered_at:p.created_at}));
  const screeningRows=(screenings.data??[]).map((s:any)=>({registration_number:(Array.isArray(s.participants)?s.participants[0]:s.participants)?.registration_number,participant:(Array.isArray(s.participants)?s.participants[0]:s.participants)?.full_name,status:s.status,screening_package:s.screening_package,systolic:s.systolic,diastolic:s.diastolic,random_blood_sugar:s.random_blood_sugar,screening_date:s.screening_date,doctor_seen:s.doctor_seen,clinical_note:s.clinical_note,referral_required:s.referral_required,follow_up_required:s.follow_up_required,completed_at:s.completed_at,updated_after_completion_at:s.updated_after_completion_at}));
  const referralRows=(referrals.data??[]).map((r:any)=>({registration_number:(Array.isArray(r.participants)?r.participants[0]:r.participants)?.registration_number,participant:(Array.isArray(r.participants)?r.participants[0]:r.participants)?.full_name,hospital:(Array.isArray(r.referral_hospitals)?r.referral_hospitals[0]:r.referral_hospitals)?.name,reason:r.reason,participant_instruction:r.participant_instruction,urgency:r.urgency,participant_informed:r.participant_informed,status:r.status,created_at:r.created_at}));
  const followRows=(followUps.data??[]).map((f:any)=>({registration_number:(Array.isArray(f.participants)?f.participants[0]:f.participants)?.registration_number,participant:(Array.isArray(f.participants)?f.participants[0]:f.participants)?.full_name,reason:f.reason,suggested_date:f.suggested_date,participant_instruction:f.participant_instruction,status:f.status,created_at:f.created_at}));
  sheet(workbook,"Participants",participantRows);sheet(workbook,"Screenings",screeningRows);sheet(workbook,"Referrals",referralRows);sheet(workbook,"Follow-ups",followRows);sheet(workbook,"Complete Records",participantRows.map((p:any)=>({...p,...(screeningRows.find((s:any)=>s.registration_number===p.registration_number)||{})})));sheet(workbook,"Staff Activity",staff.data??[]);sheet(workbook,"Export Information",[{generated_at:new Date().toISOString(),generated_by:profile.staff_id,participant_count:participantRows.length,screening_count:screeningRows.length}]);
  await db.from("audit_events").insert({actor_staff_profile_id:profile.id,action:"excel_export_generated",entity_type:"export",metadata:{participants:participantRows.length}});
  const buffer=await workbook.xlsx.writeBuffer();const stamp=new Date().toISOString().slice(0,16).replace(/[:T]/g,"-");
  return new NextResponse(buffer as BodyInit,{headers:{"Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","Content-Disposition":`attachment; filename="BUA_Health_Outreach_Export_${stamp}.xlsx"`,"Cache-Control":"no-store"}});
}
