const EMOJI_FEEDBACK = {
  "😊": {
    student: "Bu olumlu duygunun farkında kalmak, anda kalmanı ve iyi hissetmeni destekler. Nefes alırken bu hissi hatırlayabilirsin.",
    teacher: "Öğrenci olumlu bir duygu belirtti. Olumlu duyguların güçlendirilmesi için destekleyici olunabilir."
  },
  "😟": {
    student: "Kaygı hissetmek normal. Nefesine odaklanıp, bu duygunun gelip geçici olduğunu kendine hatırlatabilirsin.",
    teacher: "Öğrenci kaygı belirtti. Duygu düzenleme ve destekleyici yaklaşım önerilebilir."
  },
  "😌": {
    student: "Huzurunu hissetmek, bedenini ve zihnini rahatlatır. Kısa bir nefes molasıyla bu hissi pekiştirebilirsin.",
    teacher: "Öğrenci huzur duygusu yaşadı. Mindfulness çalışmalarıyla destek sağlanabilir."
  },
  "😍": {
    student: "Sevgi dolu hisler, kendini ve çevreni besler. Bu sevgiyi paylaşmak sana güç verir.",
    teacher: "Öğrenci sevgi duygusunu paylaştı. İlişkiler ve aidiyet duygusu güçlendirilebilir."
  },
  "😢": {
    student: "Üzgün hissetmek hayatın bir parçası. Duygunu kabul edip kendine şefkat göstermek iyileştiricidir.",
    teacher: "Öğrenci üzüntü belirtti. Paylaşım ve duygusal destek için alan açılabilir."
  },
  "😠": {
    student: "Öfkeni fark etmek, ihtiyacını anlamana yardımcı olur. Birkaç derin nefesle sakinleşmek iyi gelebilir.",
    teacher: "Öğrenci öfkesini tanıdı. İhtiyaçlarını ifade etme ve öfke yönetimi konuşulabilir."
  }
};

const MEDITATION_TEXTS = {
  "gecmis": "Gözlerini birkaç saniyeliğine kapatıp geçmişteki o anı yeniden hatırla. Nefes alırken, yaşadığın gücü bedeninde yayıldığını hayal et. O güç bugün de seninle.",
  "simdi": "Derin bir nefes al. Ellerini kalbinin üzerine koyup, şu anda seni iyi hissettiren o şeyi içtenlikle kutla. O güzel duygunun bedeninde yayıldığını hisset.",
  "gelecek": "Hayalini gözlerinde canlandır. Burnundan nefes alırken, güneşin sıcaklığının içini umutla doldurduğunu hayal et. Her nefes, seni hayaline biraz daha yaklaştırıyor."
};

const CARDS = {
  "gecmis": [
    "Geçmişte güçlendiğini hissettiğin bir anı paylaşır mısın? (Sınır koyduğun, hayır dediğin, dayanışma gösterdiğin bir an olabilir.)",
    "Bu anı düşününce bedeninde ne hissettin? (Varsa, kısaca anlatabilir misin?)",
    "meditasyon",
    "O ana dönüp baktığında, hangi güçlü yanların veya değerlerin sana yol gösterdi?",
    "Sana yol gösteren bu özelliği/hissi küçük bir hareketle göstermek istesen (ör: elini kalbine koymak, yumruğunu sıkmak, gülümsemek...), nasıl bir hareket olurdu?",
    "Bu hareketi hayatında düzenli olarak yapman, kendini her zaman güçlü hissetmeni destekler!",
    "O yaşadığından öğrendiklerinden, bugün kendine veya bir başkasına ne tavsiye edersin?",
    "Bu yaşadığın güçlenme duygusunu hangi emojiyle ifade edebilirsin?"
  ],
  "simdi": [
    "Bugün kendin için yaptığın ve seni iyi hissettiren küçük bir şeyi paylaşır mısın?",
    "Bu iyi hissettiren şeyi düşününce bedeninde ne hissediyorsun? (Varsa, kısaca anlatabilir misin?)",
    "meditasyon",
    "O anda hangi güçlü özelliğin ya da değerin devreye girdi?",
    "Bu özelliğini/hissettiğin duyguyu küçük bir hareketle göstermek istesen ne olurdu?",
    "Bu hareket, kendine iyi bakmayı hatırlamana yardımcı olur!",
    "Bu iyi hissi sürdürmek için kendine veya bir başkasına ne önerirsin?",
    "Bu iyi his duygusunu hangi emojiyle ifade edebilirsin?"
  ],
  "gelecek": [
    "Yarın sabah uyandığında bir mucize gerçekleşse, hayatında ne değişirdi?",
    "Bu mucizeyi hayal ettiğinde bedeninde bir değişim hissediyor musun? (Varsa, kısaca anlatabilir misin?)",
    "meditasyon",
    "Bu değişime yaklaşmak için hangi güçlü yönünü kullanırsın?",
    "Bu özelliğini/hayalini küçük bir hareketle göstermek istesen ne olurdu?",
    "Bu hareket, hayaline yaklaştığını ve umutlu hissetmeni destekler!",
    "Bu değişimin ilk küçük adımı ne olurdu?",
    "Bu değişimin hissettireceği duyguyu bir emojiyle ifade eder misin?"
  ]
};

let studentName = "";
let selectedCard = "";
let answers = [];
let emoji = "";

function showOnly(id) {
  document.querySelectorAll('.card').forEach(el => el.classList.remove('visible'));
  if (id) document.getElementById(id).classList.add('visible');
}

document.getElementById("toCardBtn").onclick = () => {
  const name = document.getElementById("nameInput").value.trim();
  if (!name || name.split(' ').length < 2) {
    alert("Lütfen adınızı ve soyadınızı giriniz.");
    return;
  }
  studentName = name;
  showOnly("cardSelectSection");
};

document.querySelectorAll('.zaman-card').forEach(card => {
  card.onclick = () => {
    selectedCard = card.getAttribute('data-card');
    document.querySelectorAll('.zaman-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    setTimeout(() => {
      answers = [];
      emoji = "";
      askQuestion(0);
    }, 320);
  };
});

function askQuestion(index) {
  const questions = CARDS[selectedCard];
  if (index === questions.length - 1) {
    document.getElementById("question").textContent = questions[index];
    showOnly("emojiSection");
    displayEmojiPicker((chosenEmoji) => {
      emoji = chosenEmoji;
      showFeedbackAndSendData();
    });
  } else {
    if (questions[index] === "meditasyon") {
      document.getElementById("meditationMsg").textContent = MEDITATION_TEXTS[selectedCard];
      showOnly("meditationSection");
      setTimeout(() => askQuestion(index + 1), 4000);
    } else if (
      questions[index].toLowerCase().includes("hareket") &&
      (index === 4 || index === 5)
    ) {
      if (index === 4) {
        document.getElementById("question").textContent = questions[index];
        showOnly("questionSection");
        document.getElementById("answerSection").style.display = 'flex';
        onSubmitAnswer((answer) => {
          answers.push(answer);
          document.getElementById("motivationMsg").textContent = questions[index + 1];
          showOnly("motivationSection");
          setTimeout(() => askQuestion(index + 2), 1650);
        });
      }
    } else {
      document.getElementById("question").textContent = questions[index];
      showOnly("questionSection");
      document.getElementById("answerSection").style.display = 'flex';
      onSubmitAnswer((answer) => {
        answers.push(answer);
        askQuestion(index + 1);
      });
    }
  }
}

function onSubmitAnswer(callback) {
  const btn = document.getElementById("submitBtn");
  btn.onclick = () => {
    const val = document.getElementById("answerInput").value.trim();
    if (val) {
      document.getElementById("answerInput").value = "";
      callback(val);
    }
  };
  document.getElementById("answerInput").onkeydown = (e) => {
    if (e.key === "Enter") btn.click();
  };
  document.getElementById("answerInput").focus();
}

function displayEmojiPicker(callback) {
  const emojis = ["😊", "😟", "😌", "😍", "😢", "😠"];
  const picker = document.getElementById("emojiPicker");
  picker.innerHTML = "";
  emojis.forEach(e => {
    const btn = document.createElement("button");
    btn.textContent = e;
    btn.onclick = () => {
      [...picker.children].forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      setTimeout(() => callback(e), 320);
    };
    picker.appendChild(btn);
  });
}

function showFeedbackAndSendData() {
  const feedback = EMOJI_FEEDBACK[emoji] || {
    student: "Duygularını fark ettiğin ve paylaştığın için teşekkürler! Her anı anda kalarak yaşamak büyük bir güç.",
    teacher: "Öğrenci hislerini ifade etti. Süreçteki duygusal farkındalık ve paylaşım desteklenebilir."
  };
  document.getElementById("feedbackMsg").textContent = feedback.student;
  showOnly("feedbackSection");
  const payload = {
    name: studentName,
    card: selectedCard,
    answers: [...answers],
    emoji,
    emojiStudentFeedback: feedback.student,
    emojiTeacherFeedback: feedback.teacher,
    timestamp: new Date().toISOString()
  };
  sendToGlitch(payload);
}

// GÜNCEL GLITCH PROXY'YE VERİ KAYDETME FONKSİYONU
function sendToGlitch(payload) {
  fetch("https://flying-famous-open.glitch.me/save", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  })
  .then(r => r.json())
  .then(resp => {
    // Başarılı gönderim sonrası bir şey eklemek istersen buraya ekle
    console.log("Glitch'e ve Google Sheet'e kaydedildi!", resp);
  })
  .catch(err => {
    alert("Veri gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    console.error(err);
  });
}

// Sayfa ilk açılışında sadece giriş bölümü açık olsun
showOnly("startSection");