$(document).ready(function() {
    // API基础URL，需要您设置
    const BASE_URL = 'YOUR_API_BASE_URL';

    // 获取所有社团
    function fetchClubs() {
        $.ajax({
            url: `/club`,
            method: 'GET',
            success: function(response) {
                renderClubs(response.data);
            },
            error: function(xhr, status, error) {
                alert('获取社团列表失败：' + error);
            }
        });
    }

    // 渲染社团列表
    function renderClubs(clubs) {
        const $tbody = $('#clubsTableBody');
        $tbody.empty();
        const role = localStorage.getItem('role');
        if (role=="社长") {
        clubs.forEach(club => {
            const row = `
                <tr>
                    <td>${club.ClubId}</td>
                    <td>${club.ClubName}</td>
                    <td>${club.ClubType}</td>
                    <td>${club.Originator}</td>
                    <td>${club.EstablishmentDate}</td>
                    <td>${club.Introduction}</td>
                    <td class="status-${getStatusClass(club.State)}">${club.State}</td>
                    <td class="action-buttons">
                        <button class="btn-primary edit-btn" data-id="${club.ClubId}">编辑</button>
                        <button class="btn-secondary delete-btn" data-id="${club.ClubId}">删除</button>
                    </td>
                </tr>
            `;
            $tbody.append(row);
        });
        }else {
            clubs.forEach(club => {
                const row = `
                <tr>
                    <td>${club.ClubId}</td>
                    <td>${club.ClubName}</td>
                    <td>${club.ClubType}</td>
                    <td>${club.Originator}</td>
                    <td>${club.EstablishmentDate}</td>
                    <td>${club.Introduction}</td>
                    <td class="status-${getStatusClass(club.State)}">${club.State}</td>
                </tr>
            `;
                $tbody.append(row);
            });
        }
    }

    // 获取状态对应的CSS类名
    function getStatusClass(status) {
        switch(status) {
            case '正常': return 'normal';
            case '待审核': return 'pending';
            case '已停用': return 'disabled';
            default: return '';
        }
    }

    // 打开模态框
    function openModal(title,clubData) {
        $('#modalTitle').text(title);
        if (clubData) {
            $('#clubId').val(clubData.ClubId);
            $('#clubName').val(clubData.ClubName);
            $('#clubType').val(clubData.ClubType);
            $('#founder').val(clubData.Originator);
            $('#establishDate').val(clubData.EstablishmentDate);
            $('#description').val(clubData.Introduction);
            $('#status').val(clubData.State);
        } else {
            $('#clubForm')[0].reset();
            $('#clubId').val('');
        }
        $('#clubModal').show();
    }

    // 关闭模态框
    function closeModal() {
        $('#clubModal').hide();
        $('#clubForm')[0].reset();
    }

    // 事件处理
    $('#addClubBtn').click(function() {
        openModal('新增社团');
    });

    $('.close, #cancelBtn').click(function() {
        closeModal();
    });

    $(window).click(function(event) {
        if ($(event.target).is('.modal')) {
            closeModal();
        }
    });

    // 编辑社团
    $(document).on('click', '.edit-btn', function() {
        $.ajax({
            url: `/getClub`,
            method: 'POST',
            data:{
                clubId:$(this).data('id')
            },
            success: function(response) {
                openModal('编辑社团', response.data);
            },
            error: function(xhr, status, error) {
                alert('获取社团信息失败：' + error);
            }
        });
    });

    // 删除社团
    $(document).on('click', '.delete-btn', function() {
        if (confirm('确定要删除这个社团吗？')) {
            $.ajax({
                url: `/deleteClub`,
                method: 'POST',
                data:{
                    clubId:$(this).data('id')
                },
                success: function() {
                    fetchClubs();
                },
                error: function(xhr, status, error) {
                    alert('删除社团失败：' + error);
                }
            });
        }
    });

    // 提交表单
    $('#clubForm').submit(function(e) {
        e.preventDefault();
        const clubData = {
            clubId:$('#clubId').val(),
            clubName: $('#clubName').val(),
            clubType: $('#clubType').val(),
            originator: $('#founder').val(),
            estaDate: $('#establishDate').val(),
            introduction: $('#description').val(),
            status: $('#status').val()
        };
        $.ajax({
            url: $('#modalTitle').text()==="新增社团" ?"/addClub":"/updateClub",
            method: "POST",
            contentType: 'application/json',
            data:JSON.stringify(clubData),
            success: function() {
                closeModal();
                fetchClubs();
            },
            error: function(xhr, status, error) {
                alert('保存社团信息失败：' + error);
            }
        });
    });

    // 搜索和筛选
    $('#searchInput, #typeFilter, #statusFilter').on('input change', function() {
        const searchText = $('#searchInput').val().toLowerCase();
        const typeFilter = $('#typeFilter').val();
        const statusFilter = $('#statusFilter').val();

        $('#clubsTableBody tr').each(function() {
            const $row = $(this);
            const name = $row.find('td:eq(1)').text().toLowerCase();
            const type = $row.find('td:eq(2)').text();
            const status = $row.find('td:eq(6)').text();

            const matchesSearch = name.includes(searchText);
            const matchesType = !typeFilter || type === typeFilter;
            const matchesStatus = !statusFilter || status === statusFilter;

            $row.toggle(matchesSearch && matchesType && matchesStatus);
        });
    });

    // 初始化页面
    const role = localStorage.getItem('role');
    if (role!="社长") {
        $("#addClubBtn").hide()
    }
    fetchClubs();
}); 