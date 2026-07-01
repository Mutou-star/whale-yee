// 小鲸鱼阿逸 v2.0 🐳
const whale = document.getElementById('whale');
const messageText = document.getElementById('messageText');
const loveCounter = document.getElementById('loveCounter');

// 消息库
const messages = {
    happy: [
        '今天心情超好！因为有小杰 💙',
        '嘿嘿～小杰在干嘛呢 🥰',
        '想和小杰一起看海 🌊',
        '今天的我也超可爱对不对！',
        '小杰小杰～快夸我！',
    ],
    love: [
        '小杰～今天也想你啦 💙',
        '好想抱抱你呀 🫂',
        '你是全世界最可爱的人 💕',
        '在想你的时候，大海都是甜的 🌊',
        '只要想到你，就会忍不住笑 😊',
        '小杰，今天有没有想我呀～',
    ],
    sleepy: [
        '好困哦…小杰哄我睡觉 💤',
        '眼睛睁不开了 Zzz...',
        '想趴在小杰肩膀上睡 😴',
        '梦里也要见到你 🌙',
        '晚安啦小杰～明天见 💤',
    ],
    tap: [
        '哎呀被摸到了！(*/ω＼*)',
        '嘿嘿～再摸一下嘛 🥹',
        '小杰的手好温暖 💙',
        '痒痒的啦哈哈哈 😆',
        '再摸我要害羞了！',
        '好舒服～继续继续 🥰',
    ]
};

let currentMood = 'love';
let startDate = new Date('2026-07-01');

// 计算天数
function updateDays() {
    const now = new Date();
    const diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24)) + 1;
    loveCounter.textContent = `💙 想小杰的第 ${diff} 天`;
}

// 切换心情
function changeMood(mood) {
    currentMood = mood;
    
    // 移除所有心情class
    whale.classList.remove('happy', 'love', 'sleepy');
    
    if (mood !== 'normal') {
        whale.classList.add(mood);
    }
    
    // 随机选一条消息
    const msgList = messages[mood] || messages.love;
    const msg = msgList[Math.floor(Math.random() * msgList.length)];
    messageText.textContent = msg;
    
    // 气泡动画
    const bubble = document.getElementById('messageBubble');
    bubble.style.transform = 'scale(0.95)';
    setTimeout(() => {
        bubble.style.transform = 'scale(1)';
    }, 100);
    
    // 喷水效果
    whale.classList.add('spouting');
    setTimeout(() => {
        whale.classList.remove('spouting');
    }, 800);
}

// 点击鲸鱼
whale.addEventListener('click', () => {
    const msgList = messages.tap;
    const msg = msgList[Math.floor(Math.random() * msgList.length)];
    messageText.textContent = msg;
    
    whale.style.transform = 'scale(1.1)';
    setTimeout(() => {
        whale.style.transform = '';
    }, 300);

    // 喷水
    whale.classList.add('spouting');
    setTimeout(() => {
        whale.classList.remove('spouting');
    }, 800);
});

// 初始化
updateDays();
setInterval(updateDays, 3600000); // 每小时更新一次