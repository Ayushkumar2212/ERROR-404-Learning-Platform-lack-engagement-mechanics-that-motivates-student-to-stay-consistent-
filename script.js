// Nexus AI Core Logic

// State Initialization (Step A)
let state = {
    user: {
        name: "Alex Carter",
        xp: 1250,
        level: 8,
        streak: 12,
        rank: 14,
        prevRank: 14,
        performance: [
            { subject: "Mathematics", score: 85 },
            { subject: "Physics", score: 72 },
            { subject: "History", score: 91 },
            { subject: "Science", score: 42 } // Weakest subject
        ],
        xpHistory: [80, 150, 100, 200, 120, 300, 150], // Last 7 days
        unlockedBadges: []
    },
    leaderboard: [
        { name: "Sofia Chen", xp: 3200, rank: 1 },
        { name: "Marcus Wright", xp: 2850, rank: 2 },
        { name: "Elena Rossi", xp: 2400, rank: 3 },
        { name: "Liam O'Connor", xp: 2100, rank: 4 },
        { name: "Alex Carter", xp: 1250, rank: 14 }
    ],
    feed: [
        { user: "Sofia", activity: "Completed Physics Quiz", xp: "+45 XP", time: "2m ago" },
        { user: "Marcus", activity: "Earned 'Speed Demon' badge", xp: "+100 XP", time: "5m ago" }
    ]
};

let chartInstance = null;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    initChart();
    startActivityLoop();
    updateWeakestSubjectUI();
});

function initUI() {
    document.getElementById('currentXP').textContent = state.user.xp.toLocaleString();
    document.getElementById('currentStreak').textContent = state.user.streak;
    document.getElementById('currentLevel').textContent = state.user.level;
    document.getElementById('userRank').textContent = state.user.rank;
    
    updateLeaderboardUI();
    updateFeedUI();
}

function initChart() {
    const ctx = document.getElementById('xpChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'XP Growth',
                data: state.user.xpHistory,
                borderColor: '#6366f1',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                backgroundColor: gradient,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });
}

// Logic: Identify Weakest Subject (Step A.2)
function getWeakestSubject() {
    return state.user.performance.reduce((prev, curr) => (prev.score < curr.score) ? prev : curr);
}

function updateWeakestSubjectUI() {
    const weakest = getWeakestSubject();
    document.getElementById('weakestSubjectText').textContent = weakest.subject;
}

// 10-Second Simulation Loop (Step B)
function startActivityLoop() {
    const mockActivities = [
        "earned 50 XP in Calculus",
        "unlocked 'Early Bird' Badge",
        "moved up to Rank #8",
        "finished Daily Challenge",
        "on a 15-day streak!",
        "mastered Quantum Basics"
    ];
    const mockNames = ["Leo", "Diana", "Kai", "Sasha", "Zane", "Muna"];

    setInterval(() => {
        const name = mockNames[Math.floor(Math.random() * mockNames.length)];
        const activity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
        
        const item = {
            user: name,
            activity: activity,
            xp: "+" + (Math.floor(Math.random() * 5) * 10 + 20) + " XP",
            time: "Just now"
        };
        
        state.feed.unshift(item);
        if (state.feed.length > 10) state.feed.pop();
        
        updateFeedUI();
        
        // Randomly simulate user rank change for demo
        if(Math.random() > 0.7) simulateRankChange();
    }, 10000);
}

function updateFeedUI() {
    const container = document.getElementById('xpActivityFeed');
    container.innerHTML = state.feed.map(item => `
        <div class="feed-item">
            <strong>${item.user}</strong> ${item.activity} 
            <span style="color: var(--accent); float: right">${item.xp}</span>
        </div>
    `).join('');
    container.scrollTop = 0;
}

// Leaderboard Animation Logic (Step C)
function simulateRankChange() {
    const oldRank = state.user.rank;
    // Simulate rank shift
    const change = Math.random() > 0.5 ? -1 : 1;
    state.user.rank = Math.max(1, state.user.rank + change);
    
    updateRankUI(oldRank, state.user.rank);
}

function updateRankUI(oldRank, newRank) {
    const rankEl = document.getElementById('userRank');
    const indicator = document.getElementById('rankIndicator');
    
    rankEl.textContent = newRank;
    
    if (newRank < oldRank) {
        // IMPROVED (Rank number is smaller, e.g., 14 -> 13)
        indicator.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        indicator.className = 'rank-trend up';
    } else if (newRank > oldRank) {
        // DROPPED
        indicator.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        indicator.className = 'rank-trend down';
    } else {
        indicator.innerHTML = '<i class="fa-solid fa-minus"></i>';
        indicator.className = 'rank-trend neutral';
    }
    
    // Animate the rank footer
    const footer = document.querySelector('.user-rank-footer');
    footer.style.animation = 'none';
    footer.offsetHeight; // trigger reflow
    footer.style.animation = 'pulseGlow 0.5s ease-out';
}

function updateLeaderboardUI() {
    const list = document.getElementById('leaderboardList');
    list.innerHTML = state.leaderboard.map(u => `
        <div class="leaderboard-item ${u.name === state.user.name ? 'current-user' : ''}">
            <span class="rank-num">#${u.rank}</span>
            <div class="user-info">${u.name}</div>
            <div class="user-xp">${u.xp.toLocaleString()} XP</div>
        </div>
    `).join('');
}

// AI Challenge Generation (Step D)
document.getElementById('generateAIChallengeBtn').addEventListener('click', triggerAIChallenge);

function triggerAIChallenge() {
    const modal = document.getElementById('challengeModal');
    const loading = document.getElementById('modalLoading');
    const questionBox = document.getElementById('questionContainer');
    
    modal.style.display = 'flex';
    loading.classList.remove('hidden');
    questionBox.classList.add('hidden');

    const weakest = getWeakestSubject();
    
    // Simulate LLM Call/Processing (JSON Pipeline)
    setTimeout(() => {
        // Prompt would be: "Generate a single MCQ on ${weakest.subject} for Level ${state.user.level}..."
        const rawJsonResponse = `
        {
            "category": "${weakest.subject}",
            "question": "Which of the following is a primary greenhouse gas responsible for global warming?",
            "options": ["A) Nitrogen", "B) Oxygen", "C) Carbon Dioxide", "D) Argon"],
            "correct": "C"
        }`;
        
        const data = JSON.parse(rawJsonResponse);
        renderQuestion(data);
    }, 2000);
}

function renderQuestion(data) {
    const loading = document.getElementById('modalLoading');
    const questionBox = document.getElementById('questionContainer');
    
    loading.classList.add('hidden');
    questionBox.classList.remove('hidden');
    
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('questionText').textContent = data.question;
    
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = data.options.map((opt, i) => `
        <div class="option-btn" onclick="checkAnswer('${opt.charAt(0)}', '${data.correct}')">
            <span class="option-mark">${opt.charAt(0)}</span>
            <span>${opt.substring(3)}</span>
        </div>
    `).join('');
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        handleSuccess();
    } else {
        alert("Not quite! Study more and try again.");
    }
    closeModal();
}

function handleSuccess() {
    // Update XP and Stats
    const xpGain = 150;
    state.user.xp += xpGain;
    state.user.xpHistory[state.user.xpHistory.length -1] += xpGain;
    
    // Update UI
    document.getElementById('currentXP').textContent = state.user.xp.toLocaleString();
    initChart(); // Refresh chart
    
    // Show Badge and Toast
    showToast("Challenge Mastered!", `+${xpGain} XP Earned. Science performance improved!`);
    unlockBadge();
}

function unlockBadge() {
    const wall = document.getElementById('badgesWall');
    const locked = wall.querySelector('.locked');
    if (locked) {
        locked.classList.remove('locked');
        locked.classList.add('unlocked');
        locked.innerHTML = '<img src="/c:/Users/ayush/.gemini/antigravity/brain/24a67a40-004d-4d23-83e0-376960a07e31/nexus_badge_1776851032776.png" style="width: 100%; height: 100%; border-radius: 12px;" alt="Badge">';
    }
}

function showToast(title, msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = msg;
    
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
}

function closeModal() {
    document.getElementById('challengeModal').style.display = 'none';
}

function startDailyChallenge() {
    // Similar logic to AI challenge but for fixed logic subject
    triggerAIChallenge(); // Reusing for demo
}
