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
        const $organizerId = $('#organizerId');
        
        // 清空现有选项
        $clubFilter.find('option:not(:first)').remove();
        $organizerId.find('option').remove();

        // 添加社团选项
        clubs.forEach(club => {
            const option = `<option value="${club.ClubId}">${club.ClubName}</option>`;
            $clubFilter.append(option);
            $organizerId.append(option);
        });
    }

    // 获取所有活动
    function fetchActivities() {
        $.ajax({
            url: `/activity`,
            method: 'GET',
            success: function(response) {
                renderActivities(response.data);
            },
            error: function(xhr, status, error) {
                alert('获取活动列表失败：' + error);
            }
        });
    }

    // 渲染活动列表
    function renderActivities(activities) {
        const $tbody = $('#activitiesTableBody');
        $tbody.empty();
        const role = localStorage.getItem('role');
        if (role=="社长") {
            activities.forEach(activity => {
                const row = `
                <tr>
                    <td>${activity.ActId}</td>
                    <td>${activity.ActName}</td>
                    <td><span class="activity-type type-${getTypeClass(activity.ActType)}">${activity.ActType}</span></td>
                    <td>${formatDateTime(activity.ActDate)}</td>
                    <td>${activity.ActPlace}</td>
                    <td>${activity.Att}</td>
                    <td class="description-cell" title="${activity.ActInfo}">${activity.ActInfo}</td>
                    <td>${activity.ClubName}</td>
                    <td class="action-buttons">
                        <button class="btn-primary edit-btn" data-id="${activity.ActId}">编辑</button>
                        <button class="btn-secondary delete-btn" data-id="${activity.ActId}">删除</button>
                    </td>
                </tr>
            `;
                $tbody.append(row);
            });
        }else {
            activities.forEach(activity => {
                const row = `
                <tr>
                    <td>${activity.ActId}</td>
                    <td>${activity.ActName}</td>
                    <td><span class="activity-type type-${getTypeClass(activity.ActType)}">${activity.ActType}</span></td>
                    <td>${formatDateTime(activity.ActDate)}</td>
                    <td>${activity.ActPlace}</td>
                    <td>${activity.Att}</td>
                    <td class="description-cell" title="${activity.ActInfo}">${activity.ActInfo}</td>
                    <td>${activity.ClubName}</td>
                </tr>
            `;
                $tbody.append(row);
            });
        }
    }

    // 获取活动类型对应的CSS类名
    function getTypeClass(type) {
        switch(type) {
            case '学术讲座': return 'lecture';
            case '文艺演出': return 'performance';
            case '体育比赛': return 'sports';
            case '志愿服务': return 'volunteer';
            case '社团招新': return 'recruitment';
            default: return '';
        }
    }

    // 格式化日期时间
    function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // 打开模态框
    function openModal(title, activityData) {
        $('#modalTitle').text(title);
        if (activityData) {
            $('#activityId').val(activityData.ActId);
            $('#activityName').val(activityData.ActName);
            $('#activityType').val(activityData.ActType);
            $('#activityDate').val(activityData.ActDate.replace(' ', 'T'));
            $('#location').val(activityData.ActPlace);
            $('#expectedParticipants').val(activityData.Att);
            $('#description').val(activityData.ActInfo);
            $('#organizerId').val(activityData.ClubId);
        } else {
            $('#activityForm')[0].reset();
            $('#activityId').val('');
        }
        $('#activityModal').show();
    }

    // 关闭模态框
    function closeModal() {
        $('#activityModal').hide();
        $('#activityForm')[0].reset();
    }

    // 事件处理
    $('#addActivityBtn').click(function() {
        openModal('新增活动');
    });

    $('.close, #cancelBtn').click(function() {
        closeModal();
    });

    $(window).click(function(event) {
        if ($(event.target).is('.modal')) {
            closeModal();
        }
    });

    // 编辑活动
    $(document).on('click', '.edit-btn', function() {
        $.ajax({
            url: `/getActivity`,
            method: 'POST',
            data:{
                activityId:$(this).data('id')
            },
            success: function(response) {
                openModal('编辑活动', response.data);
            },
            error: function(xhr, status, error) {
                alert('获取活动信息失败：' + error);
            }
        });
    });

    // 删除活动
    $(document).on('click', '.delete-btn', function() {
        if (confirm('确定要删除这个活动吗？')) {
            $.ajax({
                url: `/deleteActivity`,
                method: 'POST',
                data:{
                    activityId:$(this).data('id')
                },
                success: function() {
                    fetchActivities();
                },
                error: function(xhr, status, error) {
                    alert('删除活动失败：' + error);
                }
            });
        }
    });

    // 提交表单
    $('#activityForm').submit(function(e) {
        e.preventDefault();
        const activityData = {
            activityId:$('#activityId').val(),
            name: $('#activityName').val(),
            type: $('#activityType').val(),
            date: $('#activityDate').val().replace('T', ' '),
            location: $('#location').val(),
            expectedParticipants: parseInt($('#expectedParticipants').val()),
            description: $('#description').val(),
            organizerId: $('#organizerId').val()
        };
        $.ajax({
            url: $('#modalTitle').text()==="新增活动" ?"/addActivity":"/updateActivity",
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify(activityData),
            success: function() {
                closeModal();
                fetchActivities();
            },
            error: function(xhr, status, error) {
                alert('保存活动信息失败：' + error);
            }
        });
    });

    // 搜索和筛选
    $('#searchInput, #typeFilter, #clubFilter').on('input change', function() {
        const searchText = $('#searchInput').val().toLowerCase();
        const typeFilter = $('#typeFilter').val();
        const clubFilter = $('#clubFilter').val();

        $('#activitiesTableBody tr').each(function() {
            const $row = $(this);
            const name = $row.find('td:eq(1)').text().toLowerCase();
            const type = $row.find('td:eq(2)').text();
            const club = $row.find('td:eq(7)').text();

            const matchesSearch = name.includes(searchText);
            const matchesType = !typeFilter || type === typeFilter;
            const matchesClub = !clubFilter || club === $('#clubFilter option:selected').text();

            $row.toggle(matchesSearch && matchesType && matchesClub);
        });
    });

    // 初始化页面
    const role = localStorage.getItem('role');
    if (role!="社长") {
        $("#addActivityBtn").hide()
    }
    fetchClubs();
    fetchActivities();
}); 