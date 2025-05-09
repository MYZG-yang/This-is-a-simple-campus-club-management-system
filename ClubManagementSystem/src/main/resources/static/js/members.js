$(document).ready(function() {
    // API基础URL，需要您设置
    const BASE_URL = 'YOUR_API_BASE_URL';

    // 获取所有社团
    function fetchClubs() {
        $.ajax({
            url: `/club`,
            method: 'GET',
            success: function(response) {
                updateClubOptions(response.data);
            },
            error: function(xhr, status, error) {
                alert('获取社团列表失败：' + error);
            }
        });
    }

    // 更新社团选项
    function updateClubOptions(clubs) {
        const $clubFilter = $('#clubFilter');
        const $clubId = $('#clubId');
        
        // 清空现有选项
        $clubFilter.find('option:not(:first)').remove();
        $clubId.find('option').remove();

        // 添加社团选项
        clubs.forEach(club => {
            const option = `<option value="${club.ClubId}">${club.ClubName}</option>`;
            $clubFilter.append(option);
            $clubId.append(option);
        });
    }

    // 获取所有成员
    function fetchMembers() {
        $.ajax({
            url: `/user`,
            method: 'GET',
            success: function(response) {
                renderMembers(response.data);
            },
            error: function(xhr, status, error) {
                alert('获取成员列表失败：' + error);
            }
        });
    }

    // 渲染成员列表
    function renderMembers(members) {
        const $tbody = $('#membersTableBody');
        $tbody.empty();
        const role = localStorage.getItem('role');
        if (role=="社长") {
            members.forEach(member => {
                const row = `
                <tr>
                    <td>${member.userName}</td>
                    <td>${member.studentId}</td>
                    <td>${member.accDate}</td>
                    <td class="role-${getRoleClass(member.role)}">${member.role}</td>
                    <td>${member.conInfo}</td>
                    <td>${member.ClubName}</td>
                    <td class="action-buttons">
                        <button class="btn-primary edit-btn" data-id="${member.studentId}">编辑</button>
                        <button class="btn-secondary delete-btn" data-id="${member.studentId}">删除</button>
                    </td>
                </tr>
            `;
                $tbody.append(row);
            });
        }else {
            members.forEach(member => {
                const row = `
                <tr>
                    <td>${member.userName}</td>
                    <td>${member.studentId}</td>
                    <td>${member.accDate}</td>
                    <td class="role-${getRoleClass(member.role)}">${member.role}</td>
                    <td>${member.conInfo}</td>
                    <td>${member.ClubName}</td>
                </tr>
            `;
                $tbody.append(row);
            });
        }
    }

    // 获取身份对应的CSS类名
    function getRoleClass(role) {
        switch(role) {
            case '社长': return 'president';
            case '副社长': return 'vice-president';
            case '部长': return 'minister';
            case '普通成员': return 'member';
            default: return '';
        }
    }

    // 打开模态框
    function openModal(title, memberData) {
        $('#modalTitle').text(title);
        if (memberData) {
            $('#memberName').val(memberData.userName);
            $('#studentId').val(memberData.studentId);
            $('#password').val(memberData.password);
            $('#joinDate').val(memberData.accDate);
            $('#role').val(memberData.role);
            $('#contact').val(memberData.conInfo);
            $('#clubId').val(memberData.clubId);
        } else {
            $('#memberForm')[0].reset();
            $('#memberId').val('');
        }
        $('#memberModal').show();
    }

    // 关闭模态框
    function closeModal() {
        $('#memberModal').hide();
        $('#memberForm')[0].reset();
    }

    // 事件处理
    $('#addMemberBtn').click(function() {
        openModal('新增成员');
    });

    $('.close, #cancelBtn').click(function() {
        closeModal();
    });

    $(window).click(function(event) {
        if ($(event.target).is('.modal')) {
            closeModal();
        }
    });

    // 编辑成员
    $(document).on('click', '.edit-btn', function() {
        const memberId = $(this).data('id');
        $.ajax({
            url: `/getUser`,
            method: 'POST',
            data:{
                studentId:$(this).data("id")
            },
            success: function(response) {
                openModal('编辑成员', response.data);
            },
            error: function(xhr, status, error) {
                alert('获取成员信息失败：' + error);
            }
        });
    });

    // 删除成员
    $(document).on('click', '.delete-btn', function() {
        if (confirm('确定要删除这个成员吗？')) {
            $.ajax({
                url: `/deleteUser`,
                method: 'POST',
                data:{
                    studentId:$(this).data("id")
                },
                success: function() {
                    fetchMembers();
                },
                error: function(xhr, status, error) {
                    alert('删除成员失败：' + error);
                }
            });
        }
    });

    // 提交表单
    $('#memberForm').submit(function(e) {
        e.preventDefault();
        const memberData = {
            name: $('#memberName').val(),
            studentId: $('#studentId').val(),
            joinDate: $('#joinDate').val(),
            role: $('#role').val(),
            contact: $('#contact').val(),
            clubId: $('#clubId').val(),
            password:$('#password').val()
        };
        $.ajax({
            url: $('#modalTitle').text()==="新增成员"?"/addUser":"/updateUser",
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify(memberData),
            success: function() {
                closeModal();
                fetchMembers();
            },
            error: function(xhr, status, error) {
                alert('保存成员信息失败：' + error);
            }
        });
    });

    // 搜索和筛选
    $('#searchInput, #clubFilter, #roleFilter').on('input change', function() {
        const searchText = $('#searchInput').val().toLowerCase();
        const clubFilter = $('#clubFilter').val();
        const roleFilter = $('#roleFilter').val();

        $('#membersTableBody tr').each(function() {
            const $row = $(this);
            const name = $row.find('td:eq(0)').text().toLowerCase();
            const club = $row.find('td:eq(5)').text();
            const role = $row.find('td:eq(3)').text();

            const matchesSearch = name.includes(searchText);
            const matchesClub = !clubFilter || club === $('#clubFilter option:selected').text();
            const matchesRole = !roleFilter || role === roleFilter;

            $row.toggle(matchesSearch && matchesClub && matchesRole);
        });
    });

    // 初始化页面
    const role = localStorage.getItem('role');
    if (role!="社长") {
        $("#addMemberBtn").hide()
    }
    fetchClubs();
    fetchMembers();
}); 