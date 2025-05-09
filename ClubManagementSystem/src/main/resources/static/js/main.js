$(document).ready(function() {
    const clubs = [
        {
            id: 1,
            name: "羽毛球社",
            description: "我运动，我健康，我快乐，我成长",
            members: 120,
            image: "https://picsum.photos/400/300?random=1"
        },
        {
            id: 2,
            name: "篮球社",
            description: "热爱篮球的同学们一起训练、比赛，享受运动的乐趣",
            members: 150,
            image: "https://picsum.photos/400/300?random=2"
        },
        {
            id: 3,
            name: "数学研习社",
            description: "救赎之道，就在其中",
            members: 80,
            image: "https://picsum.photos/400/300?random=3"
        },
        {
            id: 4,
            name: "青年志愿者协会",
            description: "奉献爱心，服务社会，组织各类公益活动",
            members: 200,
            image: "https://picsum.photos/400/300?random=4"
        }
    ];
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
    // 渲染社团卡片
    function renderClubs(clubs) {
        const $clubsGrid = $('.clubs-grid');
        
        clubs.forEach(club => {
            const clubCard = `
                <div class="club-card">
                    <div class="club-info">
                        <h3 class="club-name">${club.ClubName}</h3>
                        <p class="club-description">${club.Introduction}</p>
                    </div>
                </div>
            `;
            $clubsGrid.append(clubCard);
        });
    }
    fetchClubs();
}); 