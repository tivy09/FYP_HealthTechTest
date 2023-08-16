<?php

// api 接口返回 信息
// status => message
return [
    // 0 -> 500 System Error Code
    '0'                 => "Success",
    '401'               => 'Unauhorized',
    '403'               => '403 Forbidden',

    // 600 -> 699 OTP Controller
    '600'               => 'Successfully get the resource list',
    '664'               => 'OTP Function Not Open',
    '665'               => 'OTP MSG Error',
    '666'               => 'OTP Send Successfully',
    '667'               => 'OTP Resend Successfully',
    '668'               => 'Verification code failed.',
    '669'               => 'Verification code has expired.',
    '670'               => 'User does not exist',
    '671'               => 'Forget Password OTP Send Successfully',
    '672'               => 'PIN mismatch. Please try again',
    '673'               => 'PIN Record Not Found',
    '674'               => 'PIN match',

    // 700 -> 799 Users Controller
    '700'               => 'User Create Successfully',
    '701'               => 'User Not Found',
    '702'               => 'User Information Get Successfully',
    '703'               => 'Email or Password is Wrong',
    '704'               => 'User Information Update Successfully',
    '705'               => 'User New Password Update Successfully',
    '706'               => 'Old Passowrd Not Match',
    '707'               => 'Get All Users Information Successfully',
    '708'               => 'Passowrd Match',
    '709'               => 'User Type Wrong, Try Angin!',

    // 800 -> 899 Country Controller
    '801'               => 'Get All Active Country',

    // 900 -> 950 Product Category Controller
    '901'               => 'All Product Category Get Success',
    '902'               => 'Product Category Create Success',
    '903'               => 'Get Product Category Success',
    '904'               => 'Product Category Updated Success',
    '905'               => 'Product Category Delete Success',
    '906'               => 'Product Category Status Update Success',

    // 951 -> 999 Products Controller
    '951'               => 'All Products Get Success',
    '952'               => 'Product Create Success',
    '953'               => 'Get Product Success',
    '954'               => 'Product Updated Success',
    '955'               => 'Product Delete Success',
    '956'               => 'Product Status Update Success',
    '957'               => 'Duplicate product name appears.',

    // 1001 -> 1050 NoticeBoard Controller
    '1001'              => 'NoticeBoard Get Success',
    '1002'              => 'NoticeBoard Create Success',
    '1003'              => 'NoticeBoard Status Update Success',

    // 1051 -> 1100 Medicine Controller
    '1051'              => 'All Medicines Get Success',
    '1052'              => 'Medicine Create Success',
    '1053'              => 'Get Medicine Detail Success',
    '1054'              => 'Medicine Detail Updated Success',
    '1055'              => 'Medicine Delete Success',
    '1056'              => 'Medicine Status Update Success',
    '1057'              => 'Duplicate medicine name appears.',

    // 1101 -> 1150 Medicine Category Controller
    '1101'              => 'All Medicine Categories Get Success',
    '1102'              => 'Medicine Category Create Success',
    '1103'              => 'Get Medicine Category Detail Success',
    '1104'              => 'Medicine Category Detail Updated Success',
    '1105'              => 'Medicine Category Delete Success',
    '1106'              => 'Medicine Category Status Update Success',
    '1107'              => 'Duplicate medicine category name appears.',
    '1108'              => 'It cannot be deleted because the category is still in the medicine.',

    // 1201 -> 1250 Department Controller
    '1201'              => 'All Department Get Success',
    '1202'              => 'Department Create Success',
    '1203'              => 'Get Department Detail Success',
    '1204'              => 'Department Detail Updated Success',
    '1206'              => 'Department Status Update Success',

    // 1301 -> 1350 Doctor Controller
    '1301'              => 'All Doctor Get Success',
    '1302'              => 'Doctor Create Success',
    '1303'              => 'Get Doctor Detail Success',
    '1304'              => 'Doctor Detail Updated Success',
    '1306'              => 'Doctor Status Update Success',
    '1307'              => 'Users exist',
    '1308'              => 'Users not exist',
    '1309'              => 'Username and password updated successfully',

    // 1401 -> 1450 Nurse Controller
    '1401'              => 'All Nurse Get Success',
    '1402'              => 'Nurse Create Success',
    '1403'              => 'Get Nurse Detail Success',
    '1404'              => 'Nurse Detail Updated Success',
    '1406'              => 'Nurse Status Update Success',
    '1407'              => 'Users exist',
    '1408'              => 'Users not exist',
    '1409'              => 'Username and password updated successfully',

    // 1501 -> 1550 Patient Controller
    '1501'              => 'All Patient Get Success',
    '1502'              => 'Patient Create Success',
    '1503'              => 'Get Patient Detail Success',
    '1504'              => 'Patient Detail Updated Success',

    // 1551 -> 1600 Appointment Controller
    '1551'              => 'All Appointment Get Success',
    '1552'              => 'Appointment Create Success',
    '1553'              => 'Update Appointment Status Success',
    '1554'              => 'Error!!! Update Appointment Status Number Wrong',
    '1555'              => 'Appointment List Get Success',
    '1556'              => 'Get One Appointment Success',
    '1557'              => 'Get Appointment By Doctor ID Success',
    '1560'              => 'Get Appointment By Department ID Success',
    '1558'              => 'Appointment Create Success, but user not register',
    '1559'              => 'Patient Get Success, using doctor id',
    '1560'              => 'Get Appointment By Patient ID Success',
    '1561'              => 'Get Appointment By Department ID Success',

    // 1601 -> 1650 Timetable Controller
    '1601'              => 'All Timetable Get Success',
    '1602'              => 'Timetable duplicate, please use update function',
    '1603'              => 'Timetable Create Success',
    '1604'              => 'Timetable Update Success',
    '1605'              => 'Timetable Detail Get Success',

    // 1651 -> 1700 MedicalReport Controller
    '1651'              => 'All MedicalReport Get Success',
    '1652'              => 'MedicalReport Create Success',
    '1653'              => 'One MedicalReport Get Success',
    '1654'              => 'Get MedicalReport By Patient ID Success',

    '1999'              => 'Document Update Successfully',
    '9999'              => 'Decrypt Error',
    '-1'                => "Something Error",
    'success'           => 'Function Success',
    'invalid_user'      => "Invalid User",
    'repeat_user'       => "Repeat User",
];
