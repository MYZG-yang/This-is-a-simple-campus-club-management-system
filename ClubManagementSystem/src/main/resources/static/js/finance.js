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

    // 获取所有经费记录
    function fetchFinances() {
        $.ajax({
            url: `/finance`,
            method: 'GET',
            success: function(response) {
                renderFinances(response.data);
            },
            error: function(xhr, status, error) {
                alert('获取经费列表失败：' + error);
            }
        });
    }

    // 渲染经费列表
    function renderFinances(finances) {
        const $tbody = $('#financeTableBody');
        $tbody.empty();
        const role = localStorage.getItem('role');
        if (role=="社长") {
            finances.forEach(finance => {
                const row = `
                <tr>
                    <td>${finance.financeId}</td>
                    <td>${finance.financeName}</td>
                    <td><span class="finance-type type-${getTypeClass(finance.financeType)}">${finance.financeType}</span></td>
                    <td class="amount-${getTypeClass(finance.financeType)}">￥${finance.financeSum.toFixed(2)}</td>
                    <td>${formatDate(finance.recordDate)}</td>
                    <td class="description-cell" title="${finance.financeInfo}">${finance.financeInfo}</td>
                    <td>${finance.ClubName}</td>
                    <td class="action-buttons">
                        <button class="btn-primary edit-btn" data-id="${finance.financeId}">编辑</button>
                        <button class="btn-secondary delete-btn" data-id="${finance.financeId}">删除</button>
                    </td>
                </tr>
            `;
                $tbody.append(row);
            });
        }else {
            finances.forEach(finance => {
                const row = `
                <tr>
                    <td>${finance.financeId}</td>
                    <td>${finance.financeName}</td>
                    <td><span class="finance-type type-${getTypeClass(finance.financeType)}">${finance.financeType}</span></td>
                    <td class="amount-${getTypeClass(finance.financeType)}">￥${finance.financeSum.toFixed(2)}</td>
                    <td>${formatDate(finance.recordDate)}</td>
                    <td class="description-cell" title="${finance.financeInfo}">${finance.financeInfo}</td>
                    <td>${finance.ClubName}</td>
                </tr>
            `;
                $tbody.append(row);
            });
        }
    }

    // 获取经费类型对应的CSS类名
    function getTypeClass(type) {
        return type === '收入' ? 'income' : 'expense';
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

    // 打开模态框
    function openModal(title, financeData = null) {
        $('#modalTitle').text(title);
        if (financeData) {
            $('#financeId').val(financeData.financeId);
            $('#financeName').val(financeData.financeName);
            $('#financeType').val(financeData.financeType);
            $('#amount').val(financeData.financeSum);
            $('#recordDate').val(financeData.recordDate);
            $('#description').val(financeData.financeInfo);
            $('#clubId').val(financeData.clubId);
        } else {
            $('#financeForm')[0].reset();
            $('#financeId').val('');
        }
        $('#financeModal').show();
    }

    // 关闭模态框
    function closeModal() {
        $('#financeModal').hide();
        $('#financeForm')[0].reset();
    }

    // 事件处理
    $('#addFinanceBtn').click(function() {
        openModal('新增经费');
    });

    $('.close, #cancelBtn').click(function() {
        closeModal();
    });

    $(window).click(function(event) {
        if ($(event.target).is('.modal')) {
            closeModal();
        }
    });

    // 编辑经费
    $(document).on('click', '.edit-btn', function() {
        $.ajax({
            url: `/getFinance`,
            method: 'POST',
            data: {
                financeId:$(this).data('id')
            },
            success: function(response) {
                openModal('编辑经费', response.data);
            },
            error: function(xhr, status, error) {
                alert('获取经费信息失败：' + error);
            }
        });
    });

    // 删除经费
    $(document).on('click', '.delete-btn', function() {
        if (confirm('确定要删除这条经费记录吗？')) {
            $.ajax({
                url: `/deleteFinance`,
                method: 'POST',
                success: function() {
                    fetchFinances();
                },
                data:{
                    financeId:$(this).data('id')
                },
                error: function(xhr, status, error) {
                    alert('删除经费记录失败：' + error);
                }
            });
        }
    });

    // 提交表单
    $('#financeForm').submit(function(e) {
        e.preventDefault();
        const financeData = {
            financeId:$('#financeId').val(),
            name: $('#financeName').val(),
            type: $('#financeType').val(),
            amount: parseFloat($('#amount').val()),
            recordDate: $('#recordDate').val(),
            description: $('#description').val(),
            clubId: $('#clubId').val()
        };
        $.ajax({
            url: $('#modalTitle').text()==="新增经费"?"/addFinance":"/updateFinance",
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify(financeData),
            success: function() {
                closeModal();
                fetchFinances();
            },
            error: function(xhr, status, error) {
                alert('保存经费信息失败：' + error);
            }
        });
    });

    // 搜索和筛选
    $('#searchInput, #typeFilter, #clubFilter').on('input change', function() {
        const searchText = $('#searchInput').val().toLowerCase();
        const typeFilter = $('#typeFilter').val();
        const clubFilter = $('#clubFilter').val();

        $('#financeTableBody tr').each(function() {
            const $row = $(this);
            const name = $row.find('td:eq(1)').text().toLowerCase();
            const type = $row.find('td:eq(2)').text();
            const club = $row.find('td:eq(6)').text();

            const matchesSearch = name.includes(searchText);
            const matchesType = !typeFilter || type === typeFilter;
            const matchesClub = !clubFilter || club === $('#clubFilter option:selected').text();

            $row.toggle(matchesSearch && matchesType && matchesClub);
        });
    });

    // 初始化页面
    const role = localStorage.getItem('role');
    if (role!="社长") {
        $("#addFinanceBtn").hide()
    }
    fetchClubs();
    fetchFinances();
}); 