<div id="sidebar" class="c-sidebar c-sidebar-fixed c-sidebar-lg-show">

    <div class="c-sidebar-brand d-md-down-none">
        <a class="c-sidebar-brand-full h4" href="#">
            {{ trans('panel.site_title') }}
        </a>
    </div>

    <ul class="c-sidebar-nav">
        <li class="c-sidebar-nav-item">
            <a href="{{ route("admin.home") }}" class="c-sidebar-nav-link">
                <i class="c-sidebar-nav-icon fas fa-fw fa-tachometer-alt">

                </i>
                {{ trans('global.dashboard') }}
            </a>
        </li>
        @can('user_management_access')
        <li class="c-sidebar-nav-dropdown {{ request()->is("admin/permissions*") ? "c-show" : "" }} {{ request()->is("admin/roles*") ? "c-show" : "" }} {{ request()->is("admin/users*") ? "c-show" : "" }} {{ request()->is("admin/user-login-logs*") ? "c-show" : "" }}">
            <a class="c-sidebar-nav-dropdown-toggle" href="#">
                <i class="fa-fw fas fa-users c-sidebar-nav-icon">

                </i>
                {{ trans('cruds.userManagement.title') }}
            </a>
            <ul class="c-sidebar-nav-dropdown-items">
                @can('permission_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.permissions.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/permissions") || request()->is("admin/permissions/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-unlock-alt c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.permission.title') }}
                    </a>
                </li>
                @endcan
                @can('role_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.roles.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/roles") || request()->is("admin/roles/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-briefcase c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.role.title') }}
                    </a>
                </li>
                @endcan
                @can('user_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.users.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/users") || request()->is("admin/users/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-user c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.user.title') }}
                    </a>
                </li>
                @endcan
                @can('user_login_log_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.user-login-logs.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/user-login-logs") || request()->is("admin/user-login-logs/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-users c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.userLoginLog.title') }}
                    </a>
                </li>
                @endcan
            </ul>
        </li>
        @endcan
        @can('notice_board_access')
        <li class="c-sidebar-nav-dropdown {{ request()->is("admin/notice-boards*") ? "c-show" : "" }}">
            <a class="c-sidebar-nav-dropdown-toggle" href="#">
                <i class="fa-fw fas fa-comment c-sidebar-nav-icon">

                </i>
                {{ trans('cruds.contentMenu.title') }}
            </a>
            <ul class="c-sidebar-nav-dropdown-items">
                @can('notice_board_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.notice-boards.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/notice-boards") || request()->is("admin/notice-boards/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-bell c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.noticeBoard.title') }}
                    </a>
                </li>
                @endcan
            </ul>
        </li>
        @endcan
        @can('medicine_access')
        <li class="c-sidebar-nav-dropdown {{ request()->is("admin/medicines*") ? "c-show" : "" }}">
            <a class="c-sidebar-nav-dropdown-toggle" href="#">
                <i class="fa-fw fas fa-comment c-sidebar-nav-icon">

                </i>
                {{ trans('cruds.medicine.title') }}
            </a>
            <ul class="c-sidebar-nav-dropdown-items">
                @can('medicine_category_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.medicine_categories.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/medicine_categories") || request()->is("admin/medicine_categories/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-bell c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.medicine_category.title') }}
                    </a>
                </li>
                @endcan
                @can('medicine_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.medicines.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/medicines") || request()->is("admin/medicines/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-bell c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.medicine.title') }}
                    </a>
                </li>
                @endcan
            </ul>
        </li>
        @endcan
        @can('user_management_access')
        <li class="c-sidebar-nav-dropdown {{ request()->is("admin/doctors*") ? "c-show" : "" }} {{ request()->is("admin/nurses*") ? "c-show" : "" }} {{ request()->is("admin/patients*") ? "c-show" : "" }} {{ request()->is("admin/user-login-logs*") ? "c-show" : "" }}">
            <a class="c-sidebar-nav-dropdown-toggle" href="#">
                <i class="fa-fw fas fa-users c-sidebar-nav-icon">

                </i>
                {{ trans('cruds.userManagement.title_user') }}
            </a>
            <ul class="c-sidebar-nav-dropdown-items">
                @can('doctor_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.doctors.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/doctors") || request()->is("admin/doctors/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-unlock-alt c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.doctor.title') }}
                    </a>
                </li>
                @endcan
                @can('nurse_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.nurses.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/nurses") || request()->is("admin/nurses/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-briefcase c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.nurse.title') }}
                    </a>
                </li>
                @endcan
                @can('patient_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.patients.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/patients") || request()->is("admin/patients/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-user c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.patient.title') }}
                    </a>
                </li>
                @endcan
            </ul>
        </li>
        @endcan
        @can('system_settings_menu_access')
        <li class="c-sidebar-nav-dropdown {{ request()->is("admin/global-settings*") ? "c-show" : "" }} {{ request()->is("admin/languages*") ? "c-show" : "" }} {{ request()->is("admin/countries*") ? "c-show" : "" }} {{ request()->is("admin/images*") ? "c-show" : "" }} {{ request()->is("admin/laravel-passports*") ? "c-show" : "" }} {{ request()->is("admin/audit-logs*") ? "c-show" : "" }} {{ request()->is("admin/departments*") ? "c-show" : "" }}">
            <a class="c-sidebar-nav-dropdown-toggle" href="#">
                <i class="fa-fw fas fa-laptop c-sidebar-nav-icon">

                </i>
                {{ trans('cruds.systemSettingsMenu.title') }}
            </a>
            <ul class="c-sidebar-nav-dropdown-items">
                @can('department_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.departments.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/departments") || request()->is("admin/departments/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-suitcase c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.department.title') }}
                    </a>
                </li>
                @endcan
                @can('global_setting_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.global-settings.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/global-settings") || request()->is("admin/global-settings/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-cogs c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.globalSetting.title') }}
                    </a>
                </li>
                @endcan
                @can('language_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.languages.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/languages") || request()->is("admin/languages/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-globe c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.language.title') }}
                    </a>
                </li>
                @endcan
                @can('country_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.countries.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/countries") || request()->is("admin/countries/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-flag c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.country.title') }}
                    </a>
                </li>
                @endcan
                @can('image_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.images.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/images") || request()->is("admin/images/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-file-image c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.image.title') }}
                    </a>
                </li>
                @endcan
                @can('laravel_passport_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.laravel-passports.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/laravel-passports") || request()->is("admin/laravel-passports/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-key c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.laravelPassport.title') }}
                    </a>
                </li>
                @endcan
                @can('audit_log_access')
                <li class="c-sidebar-nav-item">
                    <a href="{{ route("admin.audit-logs.index") }}" class="c-sidebar-nav-link {{ request()->is("admin/audit-logs") || request()->is("admin/audit-logs/*") ? "c-active" : "" }}">
                        <i class="fa-fw fas fa-file-alt c-sidebar-nav-icon">

                        </i>
                        {{ trans('cruds.auditLog.title') }}
                    </a>
                </li>
                @endcan
            </ul>
        </li>
        @endcan
        <li class="c-sidebar-nav-item">
            <a href="#" class="c-sidebar-nav-link" onclick="event.preventDefault(); document.getElementById('logoutform').submit();">
                <i class="c-sidebar-nav-icon fas fa-fw fa-sign-out-alt">

                </i>
                {{ trans('global.logout') }}
            </a>
        </li>
    </ul>

</div>

<!-- Icon Address: https://fontawesome.com/v4/icons/ -->