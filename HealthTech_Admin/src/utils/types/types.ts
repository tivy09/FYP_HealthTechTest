export type LoadingState = 'idle' | 'loading' | 'success' | 'failed'

export type LoginData = {
    input: string
    password: string
}

export type RegisterData={
    username:string
    phone_number:string
    email:string
    password:string
    is_active:number | string
    token?:string
    is_auth?:string
    type:string
}

export type MedicineData ={
    id:number
    uid:number
    name:string
    amount:number
    price:number
    status:number
    medicine_category_id:number
}

export type MedicineCategoryData ={
    id:number
    name:string
    status:number
}

export type PatientData ={
    id:number
    ic_number:string
    first_name:string
    last_name:string
    email:string
    marital_status:number
    address:string
    gender:number
    emergency_contact_name:string
    emergency_contact_phone_number:string|number
    phone_number:string|number
    avatar_id:number
}


export type DoctorData ={
    id:number
    ic_number:string
    first_name:string
    last_name:string
    email:string
    marital_status:number
    address:string
    gender:number
    emergency_contact_name:string
    emergency_contact_phone_number:string|number
    phone_number:string|number
    occupation:string
    home_phone_number:string|number
    avatar_id:number
    department_id:number
    status:number
}

export type DepartmentData ={
    id:number
    name:string
    status:number
    image:string
    image_id?:number
}

export type NoticeBoardData ={
    id:number
    title:string
    description:string
    type:string
    status:number
    image_id:number
    image:string
    image_url:string
}

export type AppointmentDetailData={
    id:number,
    date:string,
    time:string,
    status:string,
    name:string,
    phone_number:string,
    email:string,
    day:string
    image:string
}