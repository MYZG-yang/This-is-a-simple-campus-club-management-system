$(document).ready(function() {
    // API基础URL，需要您设置
    const BASE_URL = 'YOUR_API_BASE_URL';

    // 获取用户信息
    function fetchUserInfo() {
        let token=localStorage.getItem('token')
        const sid=parseInt(token)
        $.ajax({
            url: `/getUser`,
            method: 'POST',
            data:{
                studentId:sid,
            },
            success: function(response) {
                updateUserInfo(response.data);
                renderUserClubs(response.data);
            },
            error: function(xhr, status, error) {
                alert('获取用户信息失败：' + error);
            }
        });
    }
    // 更新用户信息
    function updateUserInfo(userInfo) {
        $('#userName').text(userInfo.userName);
        $('#studentId').text(userInfo.studentId);
        $('#role').text(userInfo.role);
        $('#joinDate').text(formatDate(userInfo.accDate));
        $('#contact').text(userInfo.conInfo);
    }

    // 渲染用户所属社团
    function renderUserClubs(club) {
        const $clubList = $('#clubList');
        $clubList.empty();

        if (club.length === 0) {
            $clubList.html('<p class="no-clubs">暂无加入的社团</p>');
            return;
        }

        const clubCard = `
                <div class="club-item">
                    <h3>${club.ClubName}</h3>
                    <p>${club.role}</p>
                    <p>加入时间：${formatDate(club.accDate)}</p>
                </div>
            `;
        $clubList.append(clubCard);
    }

    // 格式化日期
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
    fetchUserInfo();
    fetchUserClubs();
}); 