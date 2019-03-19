//用户自己点击关闭按钮、3个提示框操作
$('body').on('click', '.pop .icon-close,.pop .icon-close-else,.msg-pop .controls button,.success-pop .controls button,.fail-pop .controls button', function () {
    $(this).closest('.pop').removeClass('show');
    if ($('.pop-bg').find('.pop.show').length === 0) {
        $('.pop-bg').removeClass('show');
    }
});

//打开某个弹窗--直接传class名字
let showPop = (str) => {
    $(`${$('.pop-bg').hasClass('show') ? '' : '.pop-bg,'}.${str}`).addClass('show');
};

//关闭某个弹窗--直接传class名字
let closePop = (str) => {
    $(`${$('.pop-bg').find('.pop.show').length > 1 ? '' : '.pop-bg,'}.${str}`).removeClass('show');
};

//弹框展示切换--直接传class名字，第一个参数当前已展示弹窗，第二个需要展示的弹窗
let exchangePop = (str1, str2) => {
    $(`.${str1}`).removeClass('show');
    $(`.${str2}`).addClass('show');
};

//提示消息--第二个参数为true时关闭别的弹窗，其余情况只弹出提示弹窗
let alertMsg = (msg, type) => {
    if (type === true) {
        $('.pop-bg').find('.pop.show').each(function () {
            $(this).removeClass('show');
        });
    }
    $('.msg-pop .content p').text(msg);
    showPop('msg-pop');
};

//成功消息--第二个参数为true时关闭别的弹窗，其余情况只弹出提示弹窗
let successMsg = (msg, type) => {
    if (type === true) {
        $('.pop-bg').find('.pop.show').each(function () {
            $(this).removeClass('show');
        });
    }
    $('.success-pop .content p').text(msg);
    showPop('success-pop');
};

//失败消息--第二个参数为true时关闭别的弹窗，其余情况只弹出提示弹窗
let failMsg = (msg, type) => {
    if (type === true) {
        $('.pop-bg').find('.pop.show').each(function () {
            $(this).removeClass('show');
        });
    }
    $('.fail-pop .content p').text(msg);
    showPop('fail-pop');
};

//清除错误提示框
$('.form-item').on('focus', 'input,button,select', function () {
    if (!$(this).closest('.form-right').hasClass('file') || this.tagName === 'BUTTON') {
        if ($(this).closest('.form-item').hasClass('error')) {
            $(this).closest('.form-item').removeClass('error');
        }
    }
});
