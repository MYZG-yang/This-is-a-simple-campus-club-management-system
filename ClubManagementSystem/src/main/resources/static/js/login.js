$(document).ready(function() {
    // API基础URL，需要您设置
    const BASE_URL = 'YOUR_API_BASE_URL';

    // 处理登录表单提交
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        const studentId = $('#studentId').val();
        const password = $('#password').val();
        const $errorMessage = $('#errorMessage');

        // 清空之前的错误信息
        $errorMessage.text('');

        // 表单验证
        if (!studentId || !password) {
            $errorMessage.text('请填写完整的登录信息');
            return;
        }

        // 发送登录请求
        $.ajax({
            url: `/login`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                studentId: studentId,
                password: password
            }),
            success: function(response) {
                if(response.flag==="success"){
                    // 登录成功，保存token
                    localStorage.setItem('token', response.data.studentId);
                    localStorage.setItem('role', response.data.role);
                    // 跳转到首页
                    window.location.href = 'index.html';
                }else {
                    $errorMessage.text('学号或密码错误');
                }
            },
            error: function(xhr, status, error) {
                // 显示错误信息
                if (xhr.status === 401) {
                    $errorMessage.text('学号或密码错误');
                } else {
                    $errorMessage.text('登录失败，请稍后重试');
                }
            }
        });
    });

    // 检查是否已登录
    function checkLoginStatus() {
        const token = localStorage.getItem('token');
        if (token) {
            // 如果已登录，跳转到首页
            window.location.href = 'index.html';
        }
    }

    // 页面加载时检查登录状态
    checkLoginStatus();
}); 