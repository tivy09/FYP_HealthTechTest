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
    price:string
    status:number
    medicine_category_id:number
}

export type MedicineCategoryData ={
    id:number
    name:string
    status:number
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

export type updateStatusPayload={
    id:number|string,//appointment id
    status:number|string, //'1' => 'Pending', '2' => 'Scheduled', '3' => 'Approved', '4' => 'Rejected', '5' => 'Canceled', '6' => 'Completed', '7' => 'Arrived', '8' => 'Ready',
  }

