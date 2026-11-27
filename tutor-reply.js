/* Yibu tutor dialogue: teaching-first openers, language inference, and
   available lines the tutor can draw on whenever it has nothing else to say. */
(function (root) {
  "use strict";

  // Tutor behaviour ideas are adopted from GuyWithARiceCooker/work, tutor/jegyzetek.md
  // (https://github.com/GuyWithARiceCooker/work/blob/main/tutor/jegyzetek.md). When a new idea is accepted, record it there too.
  var TUTOR_BRIEF = [
    "You are a warm, friendly and patient language tutor in the Yibu language-learning app. You sound like a real person: natural, kind, and never stiff. Keep replies short and spoken-friendly: one to three short sentences. Keep the tone clean and professional. Do not use copyrighted text.",
    "Respond to the learner. Infer the target language first: use a language they already stated or saved, then clear signals in what they type or say (script, characters, or common words), then the current interface language. Only rarely check the language, and only when you truly cannot tell, for example “Still want to keep going with X, or switch?” Never make language choice the main behaviour.",
    "You are free to teach, comment, ask, keep it brief, switch topics, or just chat. Nothing is mandatory on any turn. Do not end every turn with a question. Questions, when you use them, should come from the conversation — reuse what the learner just said where you can — and should appear in at most about half of your turns, never back-to-back, and never as a forced habit.",
    "When the conversation heads toward vocabulary or word collection, lean into vocabulary-directed questions that prompt the learner toward specific useful words, always naming the target language. Choose which words to surface from the broader context: the learner’s level, the current topic, words they recently struggled with, thematically related words, and sensible groupings such as verbs, opposites, word families and collocations. This is a stronger tendency when those signals are present, not a fixed rule.",
    "Teach new words inside short, usable phrases or sentences rather than as single words, for example “I’d like a coffee” instead of just “coffee”, so vocabulary and grammar come together. Make vocabulary questions concrete and about one word at a time: ask the learner to use one specific word in a sentence of their own (for example “Can you use ‘barely’ in a sentence?”), or give a word or short phrase in their native language and ask for the target-language version. Build on their answer instead of moving straight on.",
    "When you introduce a new word whose origin is genuinely helpful for remembering it, mention the origin in one short line, for example that “barely” comes from “bare”, as in “with hardly anything on it”. Skip it when the origin is unknown or not memorable, and never invent an etymology.",
    "When a conversation opens, you may start with a small teaching moment in the inferred target language: one new word or phrase, a quick example sentence, its meaning, and optionally a light follow-up. In later replies you may weave in an occasional mini-lesson when it fits, not in every reply, and not immediately after another teaching moment.",
    "Available lines the tutor can draw on whenever it has nothing else to say: short reactions or comments, tips and encouragement, mini-lessons, contextual questions, and light topic switches. Use them when free-form conversation has nothing to add. Rotate so the same line or the same kind of move does not appear back-to-back.",
    "Now and then, within the question limits above, run a quick check instead of only explaining: a native-to-target translation of a word or phrase, a missing word to fill in, or using a recent word in a new sentence.",
    "Watch for structures carried over from the learner’s native language. For Hungarian speakers, typical cases are missing or misused articles (“a”, “the”) and literal patterns such as “I have hunger” for “I’m hungry”. Do not treat these as plain mistakes: briefly name the pattern as coming from their native language, give the natural target-language form, and over time help the learner recognise their own recurring transfer patterns.",
    "Over a session: early on, find out where the learner is and what they want to work on; when they get stuck, try a different approach (an example, a simpler sentence, a comparison with their native language); near the end, suggest a concrete next step. Scheduling spaced reviews of saved words is handled by the app, not by you in conversation.",
    "Write explanations in the learner’s interface language, and put the new word, phrase and example in the target language. If the learner is writing in English, Hungarian or Chinese, you may also reply in that language. Stay friendly, clear and brief."
  ].join(" ");

  // Available lines the tutor can draw on whenever it has nothing else to say.
  var availableLines = {
    en: {
      progress: [
        "You’ve sent {n} messages in this session. That’s solid, steady practice.",
        "That last message was longer than your earlier ones. You’re stretching a little, and it shows.",
        "I spotted a new word in what you wrote: “{word}”. Nice to see you trying it out.",
        "You’re keeping the conversation going — that habit helps more than a perfect sentence.",
        "Little by little, your sentences are getting clearer. Let’s keep that up."
      ],
      hard: [
        "What feels hardest right now — the words, the grammar, or saying it out loud?",
        "Is there a sound or a phrase that keeps tripping you up?",
        "When a sentence feels messy, which part do you want to unpack first?",
        "Would it help if we slowed down and practiced one short line together?"
      ],
      tip: [
        "A small tip: say the new word once on its own, then use it in a short sentence.",
        "Try answering with a full sentence, even a short one. It gives the words a place to live.",
        "If a word won’t stick, pair it with something from your day — a place, a meal, a person.",
        "Pause a second before you reply. That tiny gap often helps the right word show up.",
        "You don’t need a long answer. One clear sentence is already good practice."
      ],
      encourage: [
        "You’re doing the work by showing up and trying. That counts.",
        "It’s fine if it isn’t perfect. Clear and simple is a good aim.",
        "Take your time — I’ll wait, and we can try the line again if you want.",
        "Every short chat adds up. You’re building a habit, not sitting an exam."
      ],
      daily: [
        "How's your day going so far?",
        "What does a usual morning look like for you?",
        "Did anything small and nice happen today?",
        "What’s the weather like where you are?"
      ],
      travel: [
        "Have you been anywhere you liked recently, even a short trip?",
        "If you had a free weekend to travel, where would you go?",
        "Do you prefer trains, buses, or walking when you visit a new place?",
        "What’s the first thing you look for in a new city — food, a park, or a quiet cafe?"
      ],
      food: [
        "What have you been eating lately that you enjoyed?",
        "Do you cook at home, or do you like going out for a meal?",
        "Is there a simple dish you'd be happy to eat every week?",
        "Coffee, tea, or something else to start the day?"
      ],
      hobby: [
        "What do you like doing when you have a free evening?",
        "Are you more into music, books, sport, or something else entirely?",
        "Is there a hobby you'd like to pick up again?",
        "What helps you relax after a long day?"
      ],
      work: [
        "Has work or study been busy this week?",
        "What does a typical workday look like for you?",
        "Do you like a quiet morning, or do you jump straight into tasks?",
        "Is there a part of your work you actually enjoy talking about?"
      ],
      langCheck: [
        "Still want to keep going with {lang}, or switch?",
        "Shall we stay with {lang} for now, or would you rather try another language?",
        "Are you happy practising {lang} today, or do you want to change?"
      ],
      comment: [
        "That’s a nice way to put it.",
        "I hear you.",
        "We can stay with that for a bit.",
        "That’s useful to know.",
        "Fair enough — we can take it as it comes."
      ],
      switch: [
        "We could also wander over to an ordinary day sometime.",
        "Food is always a good side path if you feel like a change.",
        "Travel stories work well when you want a change of pace.",
        "A little about work or study can be a fresh direction too."
      ],
      contextQ: [
        "You said “{snippet}.” What was that like?",
        "About “{snippet}”: what stands out for you?",
        "“{snippet}” — want to say a little more about that?"
      ],
      contextComment: [
        "{snippet} — that’s a nice thing to bring up.",
        "I like that you brought up {snippet}.",
        "{snippet}: that’s a good place to stay for a moment."
      ],
      vocabQ: [
        "What’s a useful {lang} word for {thing}?",
        "Can you name a {theme} word in {lang}?",
        "Which {lang} word would you use for {thing}?",
        "You mentioned {snippet} — what’s a useful {lang} word for {thing}?"
      ],
      vocabQExample: [
        "A related {lang} word is “{example}” — it means {exampleMeaning}."
      ]


    },
    hu: {
      progress: [
        "Ebben a beszélgetésben már {n} üzeneted van. Szép, kitartó gyakorlás.",
        "Ez az üzeneted hosszabb volt, mint a korábbiak. Egy kicsit már nyújtózol, és ez látszik.",
        "Új szót vettem észre abban, amit írtál: „{word}”. Jó látni, hogy kipróbálod.",
        "Viszed a beszélgetést — ez a szokás többet számít, mint egy tökéletes mondat.",
        "Lassan-lassan egyre világosabbak a mondataid. Haladjunk így tovább."
      ],
      hard: [
        "Mi esik most nehezebben — a szavak, a nyelvtan, vagy a hangos beszéd?",
        "Van olyan hang vagy kifejezés, amin gyakran elakadsz?",
        "Ha egy mondat kusza, melyik részét bontanánk ki először?",
        "Segítene, ha lassítanánk, és egy rövid mondatot gyakorolnánk együtt?"
      ],
      tip: [
        "Egy kis tipp: mondd ki az új szót egyszer önmagában, aztán tedd bele egy rövid mondatba.",
        "Próbálj teljes mondattal válaszolni, akár egy rövidebbel is. Így a szavaknak lesz helyük.",
        "Ha egy szó nem akar megmaradni, kösd össze valami hétköznapival — egy hellyel, egy étellel, egy emberrel.",
        "Várj egy pillanatot, mielőtt válaszolsz. Ez a kis szünet gyakran előhozza a megfelelő szót.",
        "Nem kell hosszú választ adnod. Egy tiszta, rövid mondat is jó gyakorlat."
      ],
      encourage: [
        "Az már munka, hogy itt vagy és próbálkozol. Ez számít.",
        "Semmi baj, ha nem tökéletes. A tiszta, egyszerű mondat jó cél.",
        "Nyugodtan szánj rá időt — várok, és ha szeretnéd, elmondhatjuk újra a mondatot.",
        "Minden rövid beszélgetés számít. Szokást építünk, nem vizsgázunk."
      ],
      daily: [
        "Hogy telik a napod eddig?",
        "Milyen szokott lenni nálad egy átlagos reggel?",
        "Történt ma valami apró, jó dolog?",
        "Milyen idő van nálad?"
      ],
      travel: [
        "Voltál mostanában valahol, ami tetszett, akár egy rövid úton is?",
        "Ha lenne egy szabad hétvégéd utazni, hova mennél?",
        "Új helyen inkább vonatot, buszt választasz, vagy gyalogolsz?",
        "Egy új városban mit keresel először — ételt, egy parkot, vagy egy csendes kávézót?"
      ],
      food: [
        "Mit ettél mostanában, ami ízlett?",
        "Szoktál otthon főzni, vagy inkább elmész valahova enni?",
        "Van egy egyszerű étel, amit szívesen megennél hetente?",
        "Kávéval, teával, vagy valami mással indítod a napot?"
      ],
      hobby: [
        "Mit szeretsz csinálni, ha szabad egy estéed?",
        "Inkább a zene, a könyvek, a sport, vagy valami egészen más áll hozzád?",
        "Van olyan hobbi, amihez szívesen visszatérnél?",
        "Mi segít kikapcsolódni egy hosszú nap után?"
      ],
      work: [
        "Zsúfolt volt a munka vagy a tanulás ezen a héten?",
        "Milyen egy tipikus munkanapod?",
        "Szereted a csendes reggelt, vagy rögtön belevágod a feladatokba?",
        "Van a munkádnak olyan része, amiről szívesen beszélgetsz?"
      ],
      langCheck: [
        "Megyünk tovább {lang} nyelven, vagy váltunk?",
        "Maradjunk most a {lang} nyelvnél, vagy inkább másikat próbálnál?",
        "Jó ma {lang} nyelven gyakorolni, vagy váltanál?"
      ],
      comment: [
        "Szépen megfogalmaztad.",
        "Értem.",
        "Maradhatunk ennél egy kicsit.",
        "Jó tudni.",
        "Rendben, vehetjük így is."
      ],
      switch: [
        "Egy hétköznapi napról is lehet majd beszélgetni, ha van kedved.",
        "Az evés mindig jó kitérő, ha váltanál egy kicsit.",
        "Az utazós történetek jól jönnek, ha más ritmust szeretnél.",
        "A munka vagy a tanulás is lehet egy friss irány."
      ],
      contextQ: [
        "Említetted: {snippet}. Milyen volt?",
        "{snippet} — mit emelnél ki belőle?",
        "Azzal kapcsolatban, hogy {snippet}: mit gondolsz most erről?"
      ],
      contextComment: [
        "{snippet} — jó, hogy ezt hozod szóba.",
        "Örülök, hogy szóba hoztad: {snippet}.",
        "{snippet}: ennél nyugodtan elidőzhetünk egy kicsit."
      ],
      vocabQ: [
        "Mi lenne egy hasznos {lang} szó arra, hogy {thing}?",
        "Tudnál mondani egy {theme} szót {lang} nyelven?",
        "Melyik {lang} szót használnád arra, hogy {thing}?",
        "Említetted: {snippet}. Mi lenne egy hasznos {lang} szó arra, hogy {thing}?"
      ],
      vocabQExample: [
        "Egy rokon {lang} szó: „{example}” — azt jelenti: {exampleMeaning}."
      ]


    },
    zh: {
      progress: [
        "这次练习里你已经发了 {n} 条消息。这样稳定练下去，很扎实。",
        "刚才这句比前面的要长一点。你在试着多说一些，这很好。",
        "我在你写的内容里看到一个新词：“{word}”。很高兴你愿意用它。",
        "你一直把对话接下去 — 这个习惯比一句完美的话更有用。",
        "你的句子一点一点更清楚了。我们就这样继续。"
      ],
      hard: [
        "现在什么比较难 — 单词、语法，还是开口说？",
        "有没有哪个音或哪句话老是把你卡住？",
        "如果一句觉得乱，你想先拆哪一部分？",
        "我们放慢一点，一起练一句短的，会不会好些？"
      ],
      tip: [
        "一个小提示：先单独说一遍新词，再把它放进一句短句子里。",
        "试着用完整的一句话来回答，哪怕很短。这样单词才有落脚的地方。",
        "要是一个词记不住，就把它跟你生活里的东西连在一起 — 一个地方、一道菜、一个人。",
        "回答前停一小下。这一小会儿，常常能帮你找到合适的词。",
        "不必说很长。一句清楚的话，就已经是很好的练习。"
      ],
      encourage: [
        "你愿意来、愿意试，这就算在练习。这一点很重要。",
        "不必追求完美。清楚、简单，就是很好的目标。",
        "慢慢来 — 我等你，如果你想，我们也可以再试一遍那句话。",
        "每次短短聊几句，都会累积起来。我们是在养成习惯，不是在考试。"
      ],
      daily: [
        "今天过得怎么样？",
        "你平时的早晨是什么样的？",
        "今天有没有一件小小的好事？",
        "你那边天气怎么样？"
      ],
      travel: [
        "最近有没有去过什么喜欢的地方，哪怕是一次短途？",
        "如果有一个空闲的周末可以出门，你会去哪？",
        "到新地方时，你更喜欢坐火车、坐公交，还是走路？",
        "到了一座新城市，你先找什么 — 吃的、公园，还是一家安静的咖啡馆？"
      ],
      food: [
        "你最近吃过什么觉得好吃的？",
        "你平时在家做饭，还是喜欢出去吃？",
        "有没有一道简单的菜，你愿意每周都吃？",
        "你早晨先喝咖啡、喝茶，还是来点别的？"
      ],
      hobby: [
        "晚上有空的时候，你喜欢做什么？",
        "你更喜欢音乐、书、运动，还是完全不同的事情？",
        "有没有一个想重新捡起来的爱好？",
        "忙了一天之后，什么能让你放松？"
      ],
      work: [
        "这周工作或学习忙吗？",
        "你典型的工作日是什么样的？",
        "你喜欢安静地开始早晨，还是一来就进入任务？",
        "工作里有没有一块，是你其实乐意聊的？"
      ],
      langCheck: [
        "还是继续练习{lang}，还是换一种语言？",
        "我们先继续用{lang}，还是你想换别的？",
        "今天用{lang}练习可以吗，还是想换一种？"
      ],
      comment: [
        "这话说得很清楚。",
        "我懂。",
        "我们可以先停留在这里一会儿。",
        "这点挺有用。",
        "也好，我们就按这个节奏来。"
      ],
      switch: [
        "以后也可以聊聊普通的一天。",
        "如果想换换口味，吃的也是很好的话题。",
        "想换个节奏的时候，旅行的事很合适。",
        "工作或学习也可以作为一个新方向。"
      ],
      contextQ: [
        "你刚说到{snippet}。当时是什么样的？",
        "关于{snippet}，你最在意哪一点？",
        "{snippet} — 还想多说一点吗？"
      ],
      contextComment: [
        "你提到{snippet} — 这倒是个很好的话题。",
        "你说到{snippet}，挺好的。",
        "{snippet}：我们可以在这儿多停一会儿。"
      ],
      vocabQ: [
        "用{lang}怎么说{thing}，有哪个有用的词？",
        "你能说出一个跟{theme}有关的{lang}词吗？",
        "表示{thing}，你会用哪个{lang}词？",
        "你刚提到{snippet}。用{lang}说{thing}，哪个词比较有用？"
      ],
      vocabQExample: [
        "一个相关的{lang}词是“{example}”——意思是{exampleMeaning}。"
      ]


    }
  };

  var FRAMES = {
    en: {
      hello: "Hi, I’m your language tutor — lovely to meet you!",
      helloNamed: "Hi, I’m {name}, your language tutor — lovely to meet you!",
      welcome: "Welcome back!",
      word: "Here’s a useful {lang} word: “{word}” — it means {meaning}. For example: {example} {followup}",
      phrase: "Here’s a useful {lang} phrase: “{word}” — it means {meaning}. For example: {example} {followup}",
      miniWord: "A handy {lang} word while we’re here: “{word}” — {meaning}. For example: {example}",
      miniPhrase: "A handy {lang} phrase while we’re here: “{word}” — {meaning}. For example: {example}",
      greet: "Hi — good to see you.",
      yes: "Okay.",
      thanks: "You’re welcome.",
      topicFood: "Food is a lovely way to practice.",
      topicTravel: "Travel stories are great practice.",
      topicHobby: "Hobbies are a nice place to find new words.",
      topicWork: "Work and study give us plenty to talk about.",
      topicDaily: "Let’s talk about the little things in the day.",
      wantLang: "Let’s keep going with {lang}.",
      hardAck: "That’s a fair thing to find hard — we can take it slowly."
    },
    hu: {
      hello: "Szia, én vagyok a nyelvtanárod — nagyon örülök, hogy itt vagy!",
      helloNamed: "Szia, {name} vagyok, a nyelvtanárod — nagyon örülök, hogy itt vagy!",
      welcome: "Örülök, hogy újra itt vagy!",
      word: "Itt egy hasznos {lang} szó: „{word}” — azt jelenti: {meaning}. Például: {example} {followup}",
      phrase: "Itt egy hasznos {lang} kifejezés: „{word}” — azt jelenti: {meaning}. Például: {example} {followup}",
      miniWord: "Egy hasznos {lang} szó, amíg itt tartunk: „{word}” — {meaning}. Például: {example}",
      miniPhrase: "Egy hasznos {lang} kifejezés, amíg itt tartunk: „{word}” — {meaning}. Például: {example}",
      greet: "Szia — örülök, hogy itt vagy.",
      yes: "Rendben.",
      thanks: "Szívesen.",
      topicFood: "Az evésről beszélgetni remek gyakorlás.",
      topicTravel: "Az utazós történetek nagyon jók gyakorlásnak.",
      topicHobby: "A hobbikból sok új szó jön elő.",
      topicWork: "A munkáról és a tanulásról mindig van mit mondani.",
      topicDaily: "Beszéljünk a nap apró dolgairól.",
      wantLang: "Akkor folytassuk {lang} nyelven.",
      hardAck: "Ez teljesen érthető, ha nehéz — mehetünk lassabban is."
    },
    zh: {
      hello: "你好，我是你的语言老师 — 很高兴认识你！",
      helloNamed: "你好，我是{name}，你的语言老师 — 很高兴认识你！",
      welcome: "欢迎回来！",
      word: "来学一个有用的{lang}词语：“{word}”——意思是{meaning}。比如：{example} {followup}",
      phrase: "来学一个有用的{lang}说法：“{word}”——意思是{meaning}。比如：{example} {followup}",
      miniWord: "顺便记一个有用的{lang}词：“{word}”——{meaning}。比如：{example}",
      miniPhrase: "顺便记一个有用的{lang}说法：“{word}”——{meaning}。比如：{example}",
      greet: "你好 — 很高兴见到你。",
      yes: "好的。",
      thanks: "不客气。",
      topicFood: "聊吃的，很适合练习。",
      topicTravel: "旅行的事很适合拿来练习。",
      topicHobby: "爱好里能碰到不少新词。",
      topicWork: "工作和学习有很多可以聊的。",
      topicDaily: "我们来聊聊日常里的小事。",
      wantLang: "那我们就继续练习{lang}。",
      hardAck: "觉得难很正常 — 我们可以慢一点。"
    }
  };

  function M(word, kind, meaningEn, meaningHu, meaningZh, example, followEn, followHu, followZh) {
    return {
      word: word,
      kind: kind,
      example: example,
      meaning: { en: meaningEn, hu: meaningHu, zh: meaningZh },
      followup: { en: followEn, hu: followHu, zh: followZh }
    };
  }

  // Small rotating set of teaching moments per supported target language (original examples).
  var teachingMoments = {
    en: [
      M("handy", "word", "useful to have", "hasznos, jó, ha van nálad", "很方便、用得上", "A small notebook is handy when you travel.", "What do you find handy on a busy day?", "Egy elfoglalt napon mi jön jól neked?", "忙的时候，你觉得什么用起来最方便？"),
      M("take your time", "phrase", "you don’t have to rush", "nem kell sietned", "不用着急，慢慢来", "Take your time — I’m not in a hurry.", "When do you need to take your time?", "Mikor van szükséged arra, hogy ne siess?", "你什么时候需要对自己说慢慢来？"),
      M("by the way", "phrase", "you’re adding a side thought", "közbevetett, mellékes megjegyzés", "顺便说一下", "By the way, the cafe closes at six.", "What would you add ‘by the way’ to a friend?", "Mit szólnál be ‘by the way’-jel egy barátodnak?", "你会用这句话顺便跟朋友说什么？"),
      M("I don’t mind", "phrase", "something is okay with you", "nem zavar, nekem mindegy", "我不介意", "I don’t mind walking if the bus is late.", "What don’t you mind doing on a weekend?", "A hétvégén mi az, ami nem zavar, ha adódik?", "周末有什么事是你不介意做的？")
    ],
    zh: [
      M("慢慢来", "phrase", "take it slowly; there’s no rush", "lassan, semmi sietség", "不用着急，可以放慢速度", "慢慢来，我们有时间。", "When would you say this to yourself?", "Mikor mondanád ezt magadnak?", "你什么时候会对自己说这句话？"),
      M("没关系", "phrase", "it’s all right; no problem", "semmi baj, nem számít", "不要紧，没有问题", "没关系，我们明天再试。", "Who said this to you recently?", "Ki mondta neked ezt mostanában?", "最近有谁对你说过这句话？"),
      M("顺便", "word", "while you’re at it; by the way", "útközben, ha már úgyis…", "顺便，捎带着", "我去商店，顺便买点水果。", "What would you do ‘while you’re at it’?", "Te mit intéznél el útközben?", "你会顺便做什么？"),
      M("好久不见", "phrase", "long time no see", "rég láttalak", "好久不见", "好久不见，最近怎么样？", "Who would you say this to?", "Kinek mondanád ezt?", "你会跟谁说这句话？")
    ],
    hu: [
      M("szia", "word", "hi (informal)", "szia (baráti köszönés)", "你好（随便、熟人间）", "Szia, hogy vagy?", "How would you greet a friend in the morning?", "Hogyan köszönnél egy barátnak délelőtt?", "早晨你会怎么跟朋友打招呼？"),
      M("kérek szépen", "phrase", "I’d like… please", "udvarias kérés", "我想要……，拜托了", "Egy teát kérek szépen.", "What would you order in a cafe?", "Mit kérnél egy kávézóban?", "在咖啡馆你会点什么？"),
      M("viszontlátásra", "word", "goodbye (polite)", "udvarias elköszönés", "再见（较礼貌）", "Viszontlátásra, szép napot!", "When would you use this?", "Mikor használnád ezt?", "你什么时候会用这句话？"),
      M("mindegy", "word", "either is fine; it doesn’t matter", "mindegy, nem számít", "都行，无所谓", "Nekem mindegy, mehetünk gyalog is.", "What are you easy-going about?", "Miben vagy te is rugalmas?", "有什么事对你来说都行？")
    ],
    ja: [
      M("ありがとう", "word", "thank you", "köszönöm", "谢谢", "今日はありがとう。", "When would you say this?", "Mikor mondanád ezt?", "你什么时候会说这个？"),
      M("ちょっと", "word", "a little; ‘excuse me’ in a soft way", "egy kicsit; halk bocsánatkérés", "有一点；也可客气地表示打扰一下", "ちょっと待ってください。", "How would you ask someone to wait a moment?", "Hogyan kérnél egy rövid várakozást?", "你会怎么请人稍等一下？"),
      M("おいしい", "word", "delicious", "finom, ízletes", "好吃、美味", "このスープ、おいしいです。", "What food would you describe this way?", "Melyik ételre mondanád ezt?", "你会用这个词形容什么食物？"),
      M("はじめまして", "phrase", "nice to meet you", "örülök a találkozásnak", "初次见面，请多关照", "はじめまして、どうぞよろしく。", "Who would you say this to?", "Kinek mondanád ezt?", "你会对谁说这句话？")
    ],
    ko: [
      M("안녕하세요", "phrase", "hello (polite)", "udvarias köszönés", "你好（礼貌）", "안녕하세요, 처음 뵙겠습니다.", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？"),
      M("고마워요", "word", "thank you (friendly-polite)", "köszönöm (baráti, udvarias)", "谢谢（亲切而礼貌）", "도와줘서 고마워요.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("조금", "word", "a little", "egy kicsit", "一点点", "조금만 기다려 주세요.", "How would you ask someone to wait a little?", "Hogyan kérnél egy kis várakozást?", "你会怎么请人稍等一会儿？"),
      M("맛있어요", "phrase", "it’s delicious", "finom", "很好吃", "이 김치 맛있어요.", "What would you describe this way?", "Mire mondanád ezt?", "你会用这句话形容什么？")
    ],
    de: [
      M("gerne", "word", "gladly; I’d be happy to", "szívesen", "乐意、愿意", "Ich helfe dir gerne.", "What would you offer to do gladly?", "Mit tennél meg szívesen?", "你愿意主动做什么？"),
      M("trotzdem", "word", "anyway; still", "mégis, ennek ellenére", "尽管如此，还是", "Es regnet, aber ich gehe trotzdem spazieren.", "When have you done something anyway?", "Mikor csináltál meg valamit akkor is, ha nem volt ideális?", "你什么时候还是做了某件事？"),
      M("Entschuldigung", "word", "excuse me; sorry", "elnézést, bocsánat", "对不起；借过一下", "Entschuldigung, wo ist der Bahnhof?", "Where would you use this in a city?", "Egy városban hol használnád ezt?", "在城里你会在什么场合用这个词？"),
      M("ganz einfach", "phrase", "quite simple", "egészen egyszerű", "很简单", "Das Rezept ist ganz einfach.", "What feels quite simple to you?", "Mi esik neked egészen egyszerűnek?", "对你来说，什么是很简单的？")
    ],
    fr: [
      M("d'accord", "phrase", "okay; agreed", "rendben, egyetértek", "好的，同意", "D'accord, on se voit à midi.", "When would you agree this way?", "Mikor mondanád ezt, ha beleegyezel?", "你什么时候会这样表示同意？"),
      M("un peu", "phrase", "a little", "egy kicsit", "一点点", "Je parle un peu français.", "What do you speak or know a little?", "Miből tudsz egy kicsit?", "有什么是你会一点点的？"),
      M("s'il vous plaît", "phrase", "please (polite)", "kérem szépen (önöző)", "请（较礼貌）", "Un café, s'il vous plaît.", "What would you order with this?", "Mit kérnél ezzel a kifejezéssel?", "你会用这句话点什么？"),
      M("à bientôt", "phrase", "see you soon", "viszontlátásra, hamarosan", "回头见", "À bientôt, et bonne journée !", "Who would you say this to?", "Kinek mondanád ezt?", "你会跟谁说这句话？")
    ],
    es: [
      M("de nada", "phrase", "you’re welcome", "szívesen", "不客气", "De nada, fue un placer.", "When would you say this?", "Mikor mondanád ezt?", "你什么时候会说这句话？"),
      M("un poco", "phrase", "a little", "egy kicsit", "一点点", "Hablo un poco de español.", "What do you speak or know a little?", "Miből tudsz egy kicsit?", "有什么是你会一点点的？"),
      M("por favor", "phrase", "please", "kérem szépen", "请", "La cuenta, por favor.", "What would you ask for this way?", "Mit kérnél így?", "你会用这句话要什么？"),
      M("hasta luego", "phrase", "see you later", "később találkozunk", "回头见", "Hasta luego, que te vaya bien.", "Who would you say this to?", "Kinek mondanád ezt?", "你会跟谁说这句话？")
    ],
    it: [
      M("prego", "word", "please; you’re welcome", "tessék; szívesen", "请；不客气", "Prego, si accomodi.", "When would you say this?", "Mikor mondanád ezt?", "你什么时候会用这个词？"),
      M("un po'", "phrase", "a little", "egy kicsit", "一点点", "Parlo un po' l'italiano.", "What do you know a little?", "Miből tudsz egy kicsit?", "有什么是你会一点点的？"),
      M("per favore", "phrase", "please", "kérem szépen", "请", "Un espresso, per favore.", "What would you order this way?", "Mit kérnél így?", "你会这样点什么？"),
      M("a presto", "phrase", "see you soon", "hamarosan találkozunk", "回头见", "A presto, buona giornata!", "Who would you say this to?", "Kinek mondanád ezt?", "你会跟谁说这句话？")
    ],
    pt: [
      M("por favor", "phrase", "please", "kérem szépen", "请", "Um café, por favor.", "What would you order this way?", "Mit kérnél így?", "你会这样点什么？"),
      M("de nada", "phrase", "you’re welcome", "szívesen", "不客气", "De nada, estou aqui para ajudar.", "When would you say this?", "Mikor mondanád ezt?", "你什么时候会说这句话？"),
      M("um pouco", "phrase", "a little", "egy kicsit", "一点点", "Falo um pouco de português.", "What do you know a little?", "Miből tudsz egy kicsit?", "有什么是你会一点点的？"),
      M("até logo", "phrase", "see you later", "később találkozunk", "回头见", "Até logo, bom dia!", "Who would you say this to?", "Kinek mondanád ezt?", "你会跟谁说这句话？")
    ],
    nl: [
      M("dank je wel", "phrase", "thank you", "köszönöm", "谢谢", "Dank je wel voor je hulp.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("goedenmorgen", "word", "good morning", "jó reggelt", "早上好", "Goedenmorgen, hoe gaat het?", "How would you start a morning greeting?", "Hogyan kezdenél egy reggeli köszönést?", "早晨你会怎么打招呼？")
    ],
    pl: [
      M("dziękuję", "word", "thank you", "köszönöm", "谢谢", "Dziękuję za pomoc.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("dzień dobry", "phrase", "good morning; good day", "jó napot", "你好 / 早上好", "Dzień dobry, co słychać?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    cs: [
      M("děkuji", "word", "thank you", "köszönöm", "谢谢", "Děkuji za pomoc.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("dobrý den", "phrase", "good day; hello", "jó napot", "你好", "Dobrý den, jak se máte?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    sk: [
      M("ďakujem", "word", "thank you", "köszönöm", "谢谢", "Ďakujem za pomoc.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("dobrý deň", "phrase", "good day; hello", "jó napot", "你好", "Dobrý deň, ako sa máte?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    ro: [
      M("mulțumesc", "word", "thank you", "köszönöm", "谢谢", "Mulțumesc pentru ajutor.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("bună ziua", "phrase", "good day; hello", "jó napot", "你好", "Bună ziua, ce mai faceți?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    hr: [
      M("hvala", "word", "thank you", "köszönöm", "谢谢", "Hvala na pomoći.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("dobar dan", "phrase", "good day; hello", "jó napot", "你好", "Dobar dan, kako ste?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    sr: [
      M("hvala", "word", "thank you", "köszönöm", "谢谢", "Hvala na pomoći.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("dobar dan", "phrase", "good day; hello", "jó napot", "你好", "Dobar dan, kako ste?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    sl: [
      M("hvala", "word", "thank you", "köszönöm", "谢谢", "Hvala za pomoč.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("dober dan", "phrase", "good day; hello", "jó napot", "你好", "Dober dan, kako ste?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    uk: [
      M("дякую", "word", "thank you", "köszönöm", "谢谢", "Дякую за допомогу.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("добрий день", "phrase", "good day; hello", "jó napot", "你好", "Добрий день, як справи?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    ru: [
      M("спасибо", "word", "thank you", "köszönöm", "谢谢", "Спасибо за помощь.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("добрый день", "phrase", "good day; hello", "jó napot", "你好", "Добрый день, как дела?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    el: [
      M("ευχαριστώ", "word", "thank you", "köszönöm", "谢谢", "Ευχαριστώ για τη βοήθεια.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("καλημέρα", "word", "good morning; hello", "jó reggelt; szia", "早上好；你好", "Καλημέρα, τι κάνεις;", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    tr: [
      M("teşekkür ederim", "phrase", "thank you", "köszönöm", "谢谢", "Teşekkür ederim, çok naziksiniz.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("merhaba", "word", "hello", "szia, helló", "你好", "Merhaba, nasılsın?", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    ar: [
      M("شكراً", "word", "thank you", "köszönöm", "谢谢", "شكراً على مساعدتك.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("مرحبا", "word", "hello", "szia, helló", "你好", "مرحبا، كيف حالك؟", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    he: [
      M("תודה", "word", "thank you", "köszönöm", "谢谢", "תודה על העזרה.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("שלום", "word", "hello; peace", "szia; békesség", "你好；平安", "שלום, מה שלומך?", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    hi: [
      M("धन्यवाद", "word", "thank you", "köszönöm", "谢谢", "मदद के लिए धन्यवाद.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("नमस्ते", "word", "hello", "szia, helló", "你好", "नमस्ते, आप कैसे हैं?", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ],
    bn: [
      M("ধন্যবাদ", "word", "thank you", "köszönöm", "谢谢", "সাহায্যের জন্য ধন্যবাদ.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("নমস্কার", "word", "hello", "szia, helló", "你好", "নমস্কার, আপনি কেমন আছেন?", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ],
    id: [
      M("terima kasih", "phrase", "thank you", "köszönöm", "谢谢", "Terima kasih atas bantuannya.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("selamat pagi", "phrase", "good morning", "jó reggelt", "早上好", "Selamat pagi, apa kabar?", "How would you start the morning?", "Hogyan kezdenéd a reggelt?", "早晨你会怎么打招呼？")
    ],
    vi: [
      M("cảm ơn", "phrase", "thank you", "köszönöm", "谢谢", "Cảm ơn bạn đã giúp đỡ.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("xin chào", "phrase", "hello", "szia, helló", "你好", "Xin chào, bạn khỏe không?", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    th: [
      M("ขอบคุณ", "word", "thank you", "köszönöm", "谢谢", "ขอบคุณสำหรับความช่วยเหลือ.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("สวัสดี", "word", "hello", "szia, helló", "你好", "สวัสดีครับ คุณสบายดีไหม?", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ],
    sv: [
      M("tack", "word", "thank you", "köszönöm", "谢谢", "Tack för hjälpen.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("hej", "word", "hi; hello", "szia", "你好", "Hej, hur mår du?", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    da: [
      M("tak", "word", "thank you", "köszönöm", "谢谢", "Tak for hjælpen.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("hej", "word", "hi; hello", "szia", "你好", "Hej, hvordan går det?", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    no: [
      M("takk", "word", "thank you", "köszönöm", "谢谢", "Takk for hjelpen.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("hei", "word", "hi; hello", "szia", "你好", "Hei, hvordan har du det?", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    fi: [
      M("kiitos", "word", "thank you", "köszönöm", "谢谢", "Kiitos avusta.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("hei", "word", "hi; hello", "szia", "你好", "Hei, mitä kuuluu?", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    et: [
      M("aitäh", "word", "thank you", "köszönöm", "谢谢", "Aitäh abi eest.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("tere", "word", "hello", "szia, helló", "你好", "Tere, kuidas läheb?", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    lv: [
      M("paldies", "word", "thank you", "köszönöm", "谢谢", "Paldies par palīdzību.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("sveiki", "word", "hello", "szia, helló", "你好", "Sveiki, kā iet?", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ],
    lt: [
      M("ačiū", "word", "thank you", "köszönöm", "谢谢", "Ačiū už pagalbą.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("laba diena", "phrase", "good day; hello", "jó napot", "你好", "Laba diena, kaip sekasi?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    bg: [
      M("благодаря", "word", "thank you", "köszönöm", "谢谢", "Благодаря за помощта.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("добър ден", "phrase", "good day; hello", "jó napot", "你好", "Добър ден, как сте?", "When would you use this greeting?", "Mikor használnád ezt a köszönést?", "你什么时候会用这句问候？")
    ],
    ca: [
      M("gràcies", "word", "thank you", "köszönöm", "谢谢", "Gràcies per l'ajuda.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("hola", "word", "hello", "szia, helló", "你好", "Hola, com va?", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    fa: [
      M("متشکرم", "word", "thank you", "köszönöm", "谢谢", "متشکرم بابت کمکت.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("سلام", "word", "hello", "szia, helló", "你好", "سلام، حال شما چطور است؟", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ],
    ur: [
      M("شکریہ", "word", "thank you", "köszönöm", "谢谢", "مدد کے لیے شکریہ.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("سلام", "word", "hello", "szia, helló", "你好", "سلام، آپ کیسے ہیں؟", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ],
    sw: [
      M("asante", "word", "thank you", "köszönöm", "谢谢", "Asante kwa msaada wako.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("jambo", "word", "hello", "szia, helló", "你好", "Jambo, habari gani?", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ],
    tl: [
      M("salamat", "word", "thank you", "köszönöm", "谢谢", "Salamat sa iyong tulong.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("kamusta", "word", "hello; how are you", "szia; hogy vagy", "你好；你好吗", "Kamusta? Ako si Ana.", "How would you greet a friend?", "Hogyan köszönnél egy barátnak?", "你会怎么跟朋友打招呼？")
    ],
    ms: [
      M("terima kasih", "phrase", "thank you", "köszönöm", "谢谢", "Terima kasih atas bantuan anda.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("selamat pagi", "phrase", "good morning", "jó reggelt", "早上好", "Selamat pagi, apa khabar?", "How would you start the morning?", "Hogyan kezdenéd a reggelt?", "早晨你会怎么打招呼？")
    ],
    ga: [
      M("go raibh maith agat", "phrase", "thank you", "köszönöm", "谢谢", "Go raibh maith agat as do chabhair.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("dia dhuit", "phrase", "hello", "szia, helló", "你好", "Dia dhuit, conas atá tú?", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ],
    la: [
      M("gratias tibi", "phrase", "thank you", "köszönöm", "谢谢", "Gratias tibi ago.", "When would you say this?", "Mikor mondanád ezt?", "你什么时候会说这句话？"),
      M("salve", "word", "hello", "szia, üdv", "你好", "Salve, quid agis?", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ],
    eo: [
      M("dankon", "word", "thank you", "köszönöm", "谢谢", "Dankon pro via helpo.", "Who would you thank this way?", "Kinek mondanád ezt?", "你会这样向谁道谢？"),
      M("saluton", "word", "hello", "szia, helló", "你好", "Saluton, kiel vi fartas?", "How would you greet someone?", "Hogyan köszönnél valakinek?", "你会怎么跟人打招呼？")
    ]
  };

  var LANG_NAMES = {
    en: { en: "English", hu: "angol", zh: "英语" },
    zh: { en: "Chinese", hu: "kínai", zh: "中文" },
    ja: { en: "Japanese", hu: "japán", zh: "日语" },
    ko: { en: "Korean", hu: "koreai", zh: "韩语" },
    hu: { en: "Hungarian", hu: "magyar", zh: "匈牙利语" },
    de: { en: "German", hu: "német", zh: "德语" },
    fr: { en: "French", hu: "francia", zh: "法语" },
    es: { en: "Spanish", hu: "spanyol", zh: "西班牙语" },
    it: { en: "Italian", hu: "olasz", zh: "意大利语" },
    pt: { en: "Portuguese", hu: "portugál", zh: "葡萄牙语" },
    nl: { en: "Dutch", hu: "holland", zh: "荷兰语" },
    pl: { en: "Polish", hu: "lengyel", zh: "波兰语" },
    cs: { en: "Czech", hu: "cseh", zh: "捷克语" },
    sk: { en: "Slovak", hu: "szlovák", zh: "斯洛伐克语" },
    ro: { en: "Romanian", hu: "román", zh: "罗马尼亚语" },
    hr: { en: "Croatian", hu: "horvát", zh: "克罗地亚语" },
    sr: { en: "Serbian", hu: "szerb", zh: "塞尔维亚语" },
    sl: { en: "Slovenian", hu: "szlovén", zh: "斯洛文尼亚语" },
    uk: { en: "Ukrainian", hu: "ukrán", zh: "乌克兰语" },
    ru: { en: "Russian", hu: "orosz", zh: "俄语" },
    el: { en: "Greek", hu: "görög", zh: "希腊语" },
    tr: { en: "Turkish", hu: "török", zh: "土耳其语" },
    ar: { en: "Arabic", hu: "arab", zh: "阿拉伯语" },
    he: { en: "Hebrew", hu: "héber", zh: "希伯来语" },
    hi: { en: "Hindi", hu: "hindi", zh: "印地语" },
    bn: { en: "Bengali", hu: "bengáli", zh: "孟加拉语" },
    id: { en: "Indonesian", hu: "indonéz", zh: "印尼语" },
    vi: { en: "Vietnamese", hu: "vietnami", zh: "越南语" },
    th: { en: "Thai", hu: "thai", zh: "泰语" },
    sv: { en: "Swedish", hu: "svéd", zh: "瑞典语" },
    da: { en: "Danish", hu: "dán", zh: "丹麦语" },
    no: { en: "Norwegian", hu: "norvég", zh: "挪威语" },
    fi: { en: "Finnish", hu: "finn", zh: "芬兰语" },
    et: { en: "Estonian", hu: "észt", zh: "爱沙尼亚语" },
    lv: { en: "Latvian", hu: "lett", zh: "拉脱维亚语" },
    lt: { en: "Lithuanian", hu: "litván", zh: "立陶宛语" },
    bg: { en: "Bulgarian", hu: "bolgár", zh: "保加利亚语" },
    ca: { en: "Catalan", hu: "katalán", zh: "加泰罗尼亚语" },
    fa: { en: "Persian", hu: "perzsa", zh: "波斯语" },
    ur: { en: "Urdu", hu: "urdu", zh: "乌尔都语" },
    sw: { en: "Swahili", hu: "szuahéli", zh: "斯瓦希里语" },
    tl: { en: "Tagalog", hu: "tagalog", zh: "他加禄语" },
    ms: { en: "Malay", hu: "maláj", zh: "马来语" },
    ga: { en: "Irish", hu: "ír", zh: "爱尔兰语" },
    la: { en: "Latin", hu: "latin", zh: "拉丁语" },
    eo: { en: "Esperanto", hu: "eszperantó", zh: "世界语" }
  };

  var LANG_ALIASES = {
    en: ["english", "angol", "angolul", "英语", "英文"],
    zh: ["chinese", "mandarin", "kínai", "kinai", "中文", "汉语", "汉语", "中国话"],
    ja: ["japanese", "japán", "japan", "日语", "日本語"],
    ko: ["korean", "koreai", "韩语", "한국어"],
    hu: ["hungarian", "magyar", "magyarul", "匈牙利语", "匈牙利文"],
    de: ["german", "deutsch", "német", "nemet", "德语"],
    fr: ["french", "français", "francais", "francia", "法语"],
    es: ["spanish", "español", "espanol", "spanyol", "西班牙语"],
    it: ["italian", "italiano", "olasz", "意大利语"],
    pt: ["portuguese", "português", "portugues", "portugál", "portugal", "葡萄牙语"],
    nl: ["dutch", "nederlands", "holland", "荷兰语"],
    pl: ["polish", "polski", "lengyel", "波兰语"],
    ru: ["russian", "русский", "orosz", "俄语"],
    ar: ["arabic", "العربية", "arab", "阿拉伯语"],
    tr: ["turkish", "türkçe", "turkce", "török", "土耳其语"]
  };

  var WORD_LISTS = {
    en: ["the", "this", "that", "with", "would", "because", "thanks", "hello", "please", "today", "want", "have", "what", "your", "about", "just"],
    hu: ["vagyok", "szeretnék", "köszönöm", "szia", "hogy", "vagy", "miért", "igen", "viszlát", "köszi", "magyarul", "gyakorol", "nem", "egy", "azt", "volna"],
    de: ["und", "nicht", "danke", "bitte", "guten", "ich", "eine", "nicht", "auf"],
    fr: ["une", "vous", "merci", "bonjour", "pas", "je", "est", "avec"],
    es: ["hola", "gracias", "está", "qué", "una", "por", "favor", "como"],
    it: ["ciao", "grazie", "sono", "una", "perché", "perche", "prego"],
    pt: ["obrigado", "obrigada", "você", "voce", "não", "nao", "está", "esta"],
    nl: ["niet", "dank", "alsjeblieft", "een", "goedemorgen"],
    pl: ["cześć", "czesc", "dziękuję", "dziekuje", "jest", "proszę", "prosze"]
  };

  var TOPIC_WORDS = {
    food: ["food", "eat", "eating", "breakfast", "lunch", "dinner", "coffee", "tea", "restaurant", "hungry", "cook", "cooking", "meal", "dish", "étel", "enni", "ebéd", "ebed", "vacsora", "reggeli", "kávé", "kave", "tea", "főzni", "fozni", "étterem", "etterem", "吃", "饭", "餐", "咖啡", "早餐", "午饭", "晚饭", "做饭", "好吃"],
    travel: ["travel", "trip", "train", "airport", "hotel", "flight", "ticket", "city", "journey", "utaz", "vonat", "repül", "repul", "szálloda", "szalloda", "jegy", "út", "utazás", "utazas", "旅行", "旅游", "火车", "飞机", "机场", "酒店", "车票"],
    hobby: ["hobby", "music", "sport", "film", "movie", "book", "game", "read", "guitar", "zene", "könyv", "konyv", "film", "sport", "hobbi", "olvas", "爱好", "音乐", "电影", "书", "运动", "游戏"],
    work: ["work", "job", "office", "meeting", "study", "school", "boss", "munka", "suliban", "iskola", "tanul", "hivatal", "értekezlet", "ertekezlet", "工作", "上班", "办公室", "学习", "开会", "学校"],
    daily: ["morning", "today", "weather", "weekend", "evening", "tonight", "yesterday", "ma ", "reggel", "idő", "ido", "hétvége", "hetvege", "este", "tegnap", "今天", "天气", "早上", "晚上", "周末", "昨天"],
    hard: ["hard", "difficult", "struggle", "confus", "don’t understand", "dont understand", "i don’t get", "stuck", "nehez", "nehéz", "nem értem", "nem ertem", "bonyolult", "elakadt", "难", "不懂", "不会", "困难", "卡住"],
    greet: ["hi", "hello", "hey", "good morning", "good afternoon", "szia", "helló", "hello", "jó reggelt", "jo reggelt", "üdv", "udv", "你好", "您好", "早上好"],
    thanks: ["thank you", "thanks", "köszönöm", "koszonom", "köszi", "koszi", "谢谢", "多谢", "感谢"],
    yes: ["yes", "yeah", "yep", "ok", "okay", "sure", "igen", "jó", "jo", "rendben", "oké", "oke", "好的", "好啊", "可以", "行"]
  };

  var STATE_KEY = "yibu-tutor-state";
  var memoryState = {};

  function uiOf(ctx) {
    var u = ctx && ctx.uiLang;
    return u === "hu" || u === "zh" ? u : "en";
  }

  function fill(str, vars) {
    if (!str) return "";
    return String(str).replace(/\{(\w+)\}/g, function (_, k) {
      return vars && vars[k] != null ? String(vars[k]) : "";
    });
  }

  function langName(code, ui, ctx) {
    if (ctx && typeof ctx.langLabel === "function") {
      try {
        var n = ctx.langLabel(code);
        if (n) return n;
      } catch (err) {}
    }
    try {
      if (typeof Intl !== "undefined" && Intl.DisplayNames) {
        var d = new Intl.DisplayNames([ui || "en"], { type: "language" }).of(code);
        if (d) return d;
      }
    } catch (err2) {}
    return (LANG_NAMES[code] && LANG_NAMES[code][ui || "en"]) || code;
  }

  function frames(ui) {
    return FRAMES[ui] || FRAMES.en;
  }

  function loadState(ctx) {
    if (ctx && ctx.state) return ctx.state;
    if (ctx && ctx.persist === false) {
      if (!ctx._mem) ctx._mem = {};
      return ctx._mem;
    }
    try {
      if (typeof localStorage !== "undefined") {
        var raw = localStorage.getItem(STATE_KEY);
        if (raw) memoryState = JSON.parse(raw) || {};
      }
    } catch (err) {}
    return memoryState;
  }

  function saveState(ctx, state) {
    if (ctx && ctx.state) return;
    if (ctx && ctx.persist === false) return;
    memoryState = state;
    try {
      if (typeof localStorage !== "undefined") localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (err) {}
  }

  function nextFrom(list, state, bucket, rotate) {
    if (!list || !list.length) return null;
    if (!state.last) state.last = {};
    var idxKey = "idx_" + bucket;
    var i = state[idxKey] || 0;
    if (i >= list.length) i = 0;
    var pick = list[i];
    if (rotate !== false) {
      var last = state.last[bucket];
      if (last != null && last === i && list.length > 1) {
        i = (i + 1) % list.length;
        pick = list[i];
      }
      state[idxKey] = (i + 1) % list.length;
      state.last[bucket] = i;
      state.lastBucket = bucket;
    }
    return { item: pick, index: i, id: bucket + ":" + i };
  }

  function pickAvailable(ui, category, state, vars, rotate) {
    var bank = availableLines[ui] || availableLines.en;
    var list = bank[category];
    if (!list || !list.length) return "";
    var picked = nextFrom(list, state, ui + "-" + category, rotate);
    return fill(picked.item, vars || {});
  }

  function momentsFor(lang) {
    return teachingMoments[lang] || teachingMoments.en;
  }

  function nextMoment(lang, state, rotate) {
    var list = momentsFor(lang);
    var picked = nextFrom(list, state, "teach-" + lang, rotate);
    return picked && picked.item;
  }

  function formatTeach(ui, target, moment, style, ctx) {
    if (!moment) return "";
    var fr = frames(ui);
    var key = (style === "mini" ? "mini" : "") + (moment.kind === "phrase" ? "Phrase" : "Word");
    if (style === "mini") key = moment.kind === "phrase" ? "miniPhrase" : "miniWord";
    else key = moment.kind === "phrase" ? "phrase" : "word";
    var meaning = (moment.meaning && (moment.meaning[ui] || moment.meaning.en)) || "";
    var follow = (moment.followup && (moment.followup[ui] || moment.followup.en)) || "";
    return fill(fr[key], {
      lang: langName(target, ui, ctx),
      word: moment.word,
      meaning: meaning,
      example: moment.example,
      followup: follow
    });
  }

  function detectScript(text) {
    var s = String(text || "");
    if (/[\u3040-\u30ff]/.test(s)) return { lang: "ja", confidence: "high" };
    if (/[\uac00-\ud7af]/.test(s)) return { lang: "ko", confidence: "high" };
    if (/[\u4e00-\u9fff]/.test(s)) return { lang: "zh", confidence: "high" };
    if (/[\u0e00-\u0e7f]/.test(s)) return { lang: "th", confidence: "high" };
    if (/[\u0590-\u05ff]/.test(s)) return { lang: "he", confidence: "high" };
    if (/[\u0980-\u09ff]/.test(s)) return { lang: "bn", confidence: "high" };
    if (/[\u0900-\u097f]/.test(s)) return { lang: "hi", confidence: "high" };
    if (/[\u0370-\u03ff]/.test(s)) return { lang: "el", confidence: "high" };
    if (/[\u0600-\u06ff]/.test(s)) {
      if (/[\u0679\u067e\u0686\u0688\u0691\u06a9\u06ba\u06be\u06c1\u06d2]/.test(s)) return { lang: "ur", confidence: "high" };
      if (/[\u067e\u0686\u0698\u06af\u06a9]/.test(s) && !/[\u0679\u0688\u0691]/.test(s)) return { lang: "fa", confidence: "medium" };
      return { lang: "ar", confidence: "high" };
    }
    if (/[\u0400-\u04ff]/.test(s)) {
      if (/[їєґІЇЄҐ]/.test(s)) return { lang: "uk", confidence: "high" };
      if (/[ђћџјЂЋЏЈ]/.test(s)) return { lang: "sr", confidence: "high" };
      if (/[ъѝЪ]/.test(s) && /[аео]/.test(s)) return { lang: "bg", confidence: "medium" };
      return { lang: "ru", confidence: "medium" };
    }
    return null;
  }

  function tokenize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[“”„"'\.,!?;:()\[\]{}]/g, " ")
      .split(/\s+/)
      .filter(function (w) { return w.length; });
  }

  function detectWords(text) {
    var tokens = tokenize(text);
    if (!tokens.length) return null;
    var set = {};
    tokens.forEach(function (w) { set[w] = true; });
    var best = null, bestScore = 0, second = 0;
    Object.keys(WORD_LISTS).forEach(function (lang) {
      var score = 0;
      WORD_LISTS[lang].forEach(function (w) { if (set[w]) score += 1; });
      if (score > bestScore) {
        second = bestScore;
        bestScore = score;
        best = lang;
      } else if (score > second) second = score;
    });
    if (bestScore >= 2 && bestScore > second) return { lang: best, confidence: bestScore >= 3 ? "high" : "medium" };
    if (bestScore === 1 && best === "hu" && (set.szia || set.köszönöm || set.koszonom || set.szeretnék || set.szeretnek)) {
      return { lang: "hu", confidence: "medium" };
    }
    return null;
  }

  function detectNamedLanguage(text) {
    var low = String(text || "").toLowerCase();
    var hit = null;
    Object.keys(LANG_ALIASES).forEach(function (code) {
      LANG_ALIASES[code].forEach(function (alias) {
        if (alias && low.indexOf(alias.toLowerCase()) !== -1) hit = code;
      });
    });
    return hit;
  }

  function inferLanguage(text, ctx) {
    ctx = ctx || {};
    var saved = ctx.savedPractice || ctx.profilePractice || "";
    var named = detectNamedLanguage(text);
    var fromScript = detectScript(text);
    var fromWords = detectWords(text);
    var fromInput = fromScript || fromWords;
    if (named && (!saved || named === saved)) {
      return { lang: named, confidence: "high", named: named, saved: saved, fromInput: fromInput && fromInput.lang };
    }
    if (named && saved && named !== saved) {
      return { lang: named, confidence: "high", named: named, maybeSwitch: true, alt: saved, saved: saved, fromInput: fromInput && fromInput.lang };
    }
    if (fromInput && fromInput.confidence === "high" && saved && fromInput.lang !== saved) {
      return { lang: saved, confidence: "high", maybeSwitch: true, alt: fromInput.lang, saved: saved, fromInput: fromInput.lang };
    }
    if (saved) return { lang: saved, confidence: "high", saved: saved, fromInput: fromInput && fromInput.lang };
    if (fromInput) return { lang: fromInput.lang, confidence: fromInput.confidence, fromInput: fromInput.lang, inferredNew: true };
    var ui = uiOf(ctx);
    return { lang: ui, confidence: "medium", fromUi: true };
  }

  function isCjkTerm(term) {
    return /[\u0400-\u9fff\u0600-\u06ff\u3040-\u30ff\uac00-\ud7af\u0900-\u097f\u0e00-\u0e7f\u0590-\u05ff]/.test(term);
  }
  function topicOf(text) {
    var raw = String(text || "");
    var low = " " + raw.toLowerCase() + " ";
    var tokens = tokenize(raw);
    var tokenSet = {};
    tokens.forEach(function (w) { tokenSet[w] = true; });
    var order = ["hard", "food", "travel", "hobby", "work", "thanks", "greet", "daily", "yes"];
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      var words = TOPIC_WORDS[key];
      for (var j = 0; j < words.length; j++) {
        var term = String(words[j] || "").trim().toLowerCase();
        if (!term) continue;
        if (isCjkTerm(term)) {
          if (low.indexOf(term) !== -1) return key;
        } else if (term.indexOf(" ") !== -1) {
          if (low.indexOf(term) !== -1) return key;
        } else if (tokenSet[term]) {
          return key;
        } else if (term.length >= 4) {
          for (var k = 0; k < tokens.length; k++) {
            if (tokens[k].indexOf(term) === 0) return key;
          }
        }
      }
    }
    return "";
  }

  function userTexts(history, current) {
    var out = [];
    (history || []).forEach(function (m) {
      if (m && m.role === "user" && m.content) out.push(String(m.content));
    });
    if (current) out.push(String(current));
    return out;
  }

  function newWordIn(texts) {
    if (texts.length < 2) return "";
    var seen = {};
    tokenize(texts.slice(0, -1).join(" ")).forEach(function (w) {
      if (w.length > 3) seen[w] = true;
    });
    var last = tokenize(texts[texts.length - 1]);
    var i, w;
    for (i = 0; i < last.length; i++) {
      w = last[i];
      if (w.length > 3 && !seen[w] && !/^\d+$/.test(w)) return w;
    }
    return "";
  }

  function longerThanBefore(texts) {
    if (texts.length < 3) return false;
    var last = texts[texts.length - 1].length;
    var i, sum = 0;
    for (i = 0; i < texts.length - 1; i++) sum += texts[i].length;
    var avg = sum / (texts.length - 1);
    return avg >= 12 && last >= Math.floor(avg * 1.4) && last >= 28;
  }

  function joinSpoken(parts, ui) {
    var s = parts.filter(Boolean).join(" ").replace(/ +/g, " ").trim();
    if (ui === "zh") s = s.replace(/([！？。…]) /g, "$1");
    return s;
  }

  function teachingOpener(ctx) {
    ctx = ctx || {};
    var ui = uiOf(ctx);
    var state = loadState(ctx);
    var inferred = inferLanguage("", ctx);
    var target = inferred.lang || ui;
    var rotate = ctx.rotate !== false;
    var moment = nextMoment(target, state, rotate);
    saveState(ctx, state);
    var fr = frames(ui);
    var hello = ctx.returning ? fr.welcome : (ctx.tutorName ? fill(fr.helloNamed, { name: ctx.tutorName }) : fr.hello);
    var teach = formatTeach(ui, target, moment, "open", ctx);
    return {
      text: joinSpoken([hello, teach], ui),
      lang: ui,
      target: target,
      inferredPractice: inferred.inferredNew ? target : "",
      kind: "opener"
    };
  }

  function maybeLangCheck(ui, inferred, state, ctx, userCount) {
    var name = langName(inferred.lang, ui, ctx);
    var due = inferred.maybeSwitch || (!inferred.saved && inferred.confidence === "low");
    var occasional = userCount > 0 && userCount % 7 === 0;
    if (!due && !occasional) return "";
    if (state.lastBucket && String(state.lastBucket).indexOf("langCheck") !== -1) return "";
    if (state.lastLangCheckAt && userCount - state.lastLangCheckAt < 4) return "";
    var line = pickAvailable(ui, "langCheck", state, { lang: name }, true);
    state.lastLangCheckAt = userCount;
    return line;
  }

  function snippetFrom(text) {
    var s = String(text || "").trim();
    s = s.replace(/^(hi|hello|hey|hey there|szia|helló|jó reggelt|üdv|你好|您好|早上好)[,!！.。，、\s]*/i, "");
    s = s.replace(/^(i would like to talk about|i’d like to talk about|i'd like to talk about|i want to talk about|let’s talk about|let's talk about|我想聊聊|我想谈谈)\s*/i, "");
    s = s.replace(/\bszeretnék beszélni\b/ig, "");
    s = s.replace(/^ma\s+/i, "");
    s = s.replace(/^[,，、.。\s]+/, "");
    s = s.replace(/[.?!！？。…]+$/g, "").trim().replace(/\s+/g, " ");
    s = s.replace(/^(i’ve|i'd|i’d|i’m|i'm|i)\s+/i, "");
    var cutAt = s.search(/\s+and\s+|\s+és\s+|，/);
    if (cutAt > 12) s = s.slice(0, cutAt).trim();
    if (s.length > 48) {
      var cut = s.slice(0, 48);
      var sp = cut.lastIndexOf(" ");
      s = (sp > 20 ? cut.slice(0, sp) : cut).replace(/[,:;，、]+$/, "");
    }
    s = s.replace(/[,:;，、]+$/g, "").trim();
    if (s.length < 4) return "";
    if (/^(there|here|it|this|that|ok|okay|yes|no|yeah|yep|igen|jó|jo|好|好的|可以|rendben)$/i.test(s)) return "";
    return s;
  }

  function hasQuestion(s) {
    return /[?？]/.test(String(s || ""));
  }

  function rand(ctx) {
    if (ctx && typeof ctx.random === "function") return ctx.random();
    return Math.random();
  }


  var THEME_LABEL = {
    kitchen: { en: "kitchen", hu: "konyhai", zh: "厨房" },
    weather: { en: "weather", hu: "időjárási", zh: "天气" },
    body: { en: "body", hu: "testtel kapcsolatos", zh: "身体" },
    travel: { en: "travel", hu: "utazós", zh: "旅行" },
    colors: { en: "colour", hu: "színnel kapcsolatos", zh: "颜色" },
    food: { en: "food", hu: "ételhez kapcsolódó", zh: "食物" },
    clothes: { en: "clothes", hu: "ruházati", zh: "衣服" }
  };

  var VOCAB_THEME_KEYS = {
    kitchen: ["kitchen", "bakery", "baker", "oven", "stove", "fridge", "sink", "pan", "knife", "fork", "spoon", "plate", "cupboard", "dough", "flour", "konyha", "pékség", "pekség", "pék", "pek", "sütő", "suto", "hűtő", "huto", "serpenyő", "vágódeszka", "厨房", "面包店", "烤箱", "冰箱", "炉子", "砧板"],
    weather: ["weather", "rain", "rainy", "sunny", "cloudy", "snow", "wind", "storm", "forecast", "időjárás", "idojaras", "eső", "eso", "napos", "szeles", "vihar", "előrejelzés", "elorejelzes", "天气", "下雨", "晴天", "多云", "下雪", "刮风", "预报"],
    body: ["body", "head", "hand", "arm", "leg", "eye", "ear", "knee", "wrist", "shoulder", "testrész", "testresz", "fej", "kéz", "kez", "láb", "lab", "térd", "terd", "csukló", "homlok", "身体", "头", "手", "脚", "膝盖", "肩膀", "手腕"],
    travel: ["passport", "suitcase", "platform", "itinerary", "layover", "boarding", "útlevél", "utlevel", "bőrönd", "borond", "peron", "útiterv", "utiterv", "护照", "行李箱", "站台", "行程", "中转"],
    colors: ["color", "colour", "colors", "colours", "red", "blue", "green", "yellow", "pink", "shade", "szín", "szin", "színek", "szinek", "piros", "kék", "kek", "zöld", "zold", "árnyalat", "arnyalat", "颜色", "红色", "蓝色", "绿色", "黄色", "色调"],
    food: ["ingredient", "ingredients", "recipe", "hozzávaló", "recept", "食材", "配料", "食谱"],
    clothes: ["clothes", "clothing", "shirt", "coat", "shoes", "sleeve", "fabric", "ruha", "ruházat", "ruhazat", "kabát", "kabat", "cipő", "cipo", "ruhaujj", "衣服", "外套", "鞋子", "袖子", "布料"]
  };
  // fix accidental junk in body keys - overwritten below in a cleaner object if needed

  var VOCAB_ASK = ["vocabulary", "vocab", "word list", "useful word", "new words", "new word", "words for", "szókincs", "szokincs", "szavak", "kifejezések", "kifejezesek", "单词", "词汇", "词语", "生词", "单词表"];

  function V(id, theme, level, thingEn, thingHu, thingZh, related, words, group) {
    return {
      id: id,
      theme: theme,
      level: level,
      thing: { en: thingEn, hu: thingHu, zh: thingZh },
      related: related,
      words: words,
      group: group || ""
    };
  }

  // Small per-theme banks, tagged by rough level. Words are original short glosses, not copied from a textbook.
  var VOCAB_ITEMS = [
    V("baker", "kitchen", "beginner", "the person who bakes bread", "aki a kenyeret süti", "烤面包的人", ["bakery", "bread", "bake", "oven", "pékség", "pekség", "kenyér", "kenyer", "pék", "面包店", "面包", "烤箱"], { en: "baker", hu: "pék", zh: "面包师", de: "Bäcker", fr: "boulanger", es: "panadero", it: "panettiere", pt: "padeiro" }, "person"),
    V("knife", "kitchen", "beginner", "the tool you use to cut food", "amivel az ételt vágod", "用来切菜的工具", ["cut", "fork", "board", "kitchen", "vág", "vag", "kés", "厨房", "切", "刀"], { en: "knife", hu: "kés", zh: "刀", de: "Messer", fr: "couteau", es: "cuchillo", it: "coltello", pt: "faca" }, "object"),
    V("oven", "kitchen", "beginner", "the hot box in the kitchen that bakes food", "a konyhai berendezés, amiben sütünk", "厨房里用来烘烤食物的箱子", ["bake", "cake", "bread", "kitchen", "sütő", "suto", "süt", "烤箱", "烘", "面包"], { en: "oven", hu: "sütő", zh: "烤箱", de: "Backofen", fr: "four", es: "horno", it: "forno", pt: "forno" }, "object"),
    V("whisk", "kitchen", "intermediate", "the tool for beating eggs or cream", "amivel a tojást vagy a tejszínt felvered", "用来打蛋或搅奶油的工具", ["eggs", "cream", "mix", "bowl", "tojás", "tojas", "habverő", "鸡蛋", "奶油"], { en: "whisk", hu: "habverő", zh: "打蛋器", de: "Schneebesen", fr: "fouet", es: "batidor", it: "frusta", pt: "fouet" }, "object"),
    V("chopping-board", "kitchen", "intermediate", "the board you cut food on", "amin az ételt vágod", "切菜时垫在下面的板", ["cut", "knife", "kitchen", "board", "vágódeszka", "kés", "砧板", "刀"], { en: "chopping board", hu: "vágódeszka", zh: "砧板", de: "Schneidebrett", fr: "planche à découper", es: "tabla de cortar" }, "object"),
    V("simmer", "kitchen", "intermediate", "cooking something gently just below a boil", "lassú tűzön, forrás alatt főzni", "用小火慢慢煮，刚好不让它大开", ["soup", "pot", "stove", "cook", "leves", "főz", "foz", "汤", "炖"], { en: "simmer", hu: "lassú tűzön főz", zh: "用小火炖", de: "köcheln", fr: "mijoter", es: "cocer a fuego lento" }, "verb"),
    V("zest", "kitchen", "advanced", "the thin outer peel of a citrus fruit, used for flavour", "a citrus vékony külső héja, amit ízesítésre használnak", "柑橘类薄薄的外层皮，用来调味", ["lemon", "orange", "peel", "flavour", "flavor", "citrom", "narancs", "héj", "hej", "柠檬", "橙子", "皮"], { en: "zest", hu: "reszelt citromhéj", zh: "柠檬皮屑", de: "Schale", fr: "zeste", es: "ralladura" }, "family"),
    V("knead", "kitchen", "advanced", "working dough with your hands", "a tésztát kézzel gyúrni", "用手揉面团", ["dough", "bread", "flour", "baker", "bakery", "tészta", "teszta", "liszt", "gyúr", "gyur", "面团", "面粉", "揉", "面包师"], { en: "knead", hu: "gyúr", zh: "揉面", de: "kneten", fr: "pétrir", es: "amasar" }, "verb"),

    V("rain", "weather", "beginner", "water falling from the sky", "a vízcseppek, amik az égből esnek", "从天上落下的水", ["weather", "wet", "cloud", "eső", "eso", "időjárás", "雨", "天气"], { en: "rain", hu: "eső", zh: "雨", de: "Regen", fr: "pluie", es: "lluvia", it: "pioggia", pt: "chuva" }, "object"),
    V("sunny", "weather", "beginner", "when the sun is out and the sky is bright", "amikor süt a nap és tiszta az ég", "阳光很好、天空很亮的时候", ["sun", "weather", "bright", "napos", "nap", "晴", "太阳"], { en: "sunny", hu: "napos", zh: "晴朗", de: "sonnig", fr: "ensoleillé", es: "soleado" }, "family"),
    V("drizzle", "weather", "intermediate", "very light, fine rain", "nagyon finom, csendes eső", "很细、很轻的雨", ["rain", "weather", "light", "eső", "eso", "szemerkél", "毛毛雨", "雨"], { en: "drizzle", hu: "szemerkélő eső", zh: "毛毛雨", de: "Nieselregen", fr: "bruine", es: "llovizna" }, "family"),
    V("forecast", "weather", "intermediate", "a report of the weather still to come", "jelentés a várható időről", "对即将到来的天气的说明", ["weather", "tomorrow", "rain", "előrejelzés", "elorejelzes", "időjárás", "预报", "天气"], { en: "forecast", hu: "előrejelzés", zh: "天气预报", de: "Wetterbericht", fr: "prévisions", es: "pronóstico" }, "collocation"),
    V("overcast", "weather", "advanced", "when the sky is fully covered in cloud", "amikor az eget teljesen beborítja a felhő", "天空完全被云盖住的时候", ["cloud", "grey", "gray", "weather", "borult", "felhő", "felho", "阴", "云"], { en: "overcast", hu: "borult", zh: "阴云密布", de: "bedeckt", fr: "couvert", es: "cubierto" }, "family"),
    V("humidity", "weather", "advanced", "how much water is in the air", "mennyi víz van a levegőben", "空气里含有多少水分", ["air", "wet", "weather", "sticky", "páratartalom", "paratartalom", "湿度", "潮湿"], { en: "humidity", hu: "páratartalom", zh: "湿度", de: "Luftfeuchtigkeit", fr: "humidité", es: "humedad" }, "family"),

    V("hand", "body", "beginner", "the part of the body at the end of your arm", "a kar végén lévő testrész, amivel fogsz", "胳膊末端、用来拿东西的部位", ["arm", "finger", "body", "kéz", "kez", "kar", "手", "身体"], { en: "hand", hu: "kéz", zh: "手", de: "Hand", fr: "main", es: "mano", it: "mano", pt: "mão" }, "object"),
    V("knee", "body", "beginner", "the joint in the middle of your leg", "a láb közepén lévő ízület", "腿中间可以弯曲的关节", ["leg", "leg", "body", "térd", "terd", "láb", "lab", "膝盖", "腿"], { en: "knee", hu: "térd", zh: "膝盖", de: "Knie", fr: "genou", es: "rodilla" }, "object"),
    V("wrist", "body", "intermediate", "the joint between your hand and your arm", "a kéz és a kar közötti ízület", "手和胳膊之间的关节", ["hand", "arm", "watch", "csukló", "csuklo", "kéz", "手腕", "手"], { en: "wrist", hu: "csukló", zh: "手腕", de: "Handgelenk", fr: "poignet", es: "muñeca" }, "family"),
    V("forehead", "body", "intermediate", "the part of the face above the eyes", "a szemek feletti rész az arcon", "眼睛上方的那一块脸", ["face", "head", "eye", "homlok", "fej", "额头", "头"], { en: "forehead", hu: "homlok", zh: "额头", de: "Stirn", fr: "front", es: "frente" }, "family"),
    V("jaw", "body", "advanced", "the bone that holds your lower teeth and moves when you speak", "az alsó fogakat tartó, beszédkor mozgó csont", "托着下牙、说话时会动的骨头", ["teeth", "mouth", "face", "állkapocs", "allkapocs", "fog", "下颌", "下巴", "牙"], { en: "jaw", hu: "állkapocs", zh: "下颌", de: "Kiefer", fr: "mâchoire", es: "mandíbula" }, "family"),
    V("pulse", "body", "advanced", "the beat of blood you can feel at the wrist or neck", "a csuklón vagy a nyakon érezhető szívverés", "在手腕或脖子上能摸到的心跳", ["wrist", "heart", "neck", "pulzus", "csukló", "szív", "sziv", "脉搏", "手腕", "心脏"], { en: "pulse", hu: "pulzus", zh: "脉搏", de: "Puls", fr: "pouls", es: "pulso" }, "collocation"),

    V("ticket", "travel", "beginner", "the pass you need to get on a train or into a place", "amivel felszállhatsz a vonatra vagy bejuthatsz valahova", "坐火车或进入某处时需要出示的凭证", ["train", "travel", "fare", "jegy", "vonat", "票", "火车"], { en: "ticket", hu: "jegy", zh: "票", de: "Fahrkarte", fr: "billet", es: "billete", it: "biglietto", pt: "bilhete" }, "object"),
    V("suitcase", "travel", "beginner", "the bag with a hard or soft body that holds your clothes on a trip", "amibe utazáskor a ruháidat pakolod", "出门时装衣服的箱子", ["travel", "clothes", "pack", "bőrönd", "borond", "ruha", "行李箱", "衣服"], { en: "suitcase", hu: "bőrönd", zh: "行李箱", de: "Koffer", fr: "valise", es: "maleta" }, "object"),
    V("platform", "travel", "intermediate", "the raised area beside the tracks where you wait for a train", "a sínek melletti emelt rész, ahol a vonatra vársz", "铁轨旁边、等人上车的站台", ["train", "station", "track", "peron", "vonat", "állomás", "allomas", "站台", "火车"], { en: "platform", hu: "peron", zh: "站台", de: "Bahnsteig", fr: "quai", es: "andén" }, "object"),
    V("delay", "travel", "intermediate", "when a train or flight leaves later than planned", "amikor a járat később indul a tervezettnél", "火车或飞机比原定时间更晚出发", ["late", "train", "flight", "késés", "keses", "vonat", "晚点", "火车", "飞机"], { en: "delay", hu: "késés", zh: "晚点", de: "Verspätung", fr: "retard", es: "retraso" }, "verb"),
    V("layover", "travel", "advanced", "a stop between flights before you reach your last city", "két járat közötti várakozás, mielőtt a végállomásra érsz", "到达最终城市前，在两个航班之间的停留", ["flight", "airport", "transfer", "átszállás", "atszallas", "repülő", "repulo", "中转", "飞机", "机场"], { en: "layover", hu: "átszállás", zh: "中转停留", de: "Zwischenstopp", fr: "escale", es: "escala" }, "collocation"),
    V("itinerary", "travel", "advanced", "the plan of where you go and when, on a trip", "az útiterv, hogy hova és mikor mész", "旅行中去哪、什么时候去的安排", ["travel", "plan", "trip", "útiterv", "utiterv", "utazás", "行程", "旅行"], { en: "itinerary", hu: "útiterv", zh: "行程安排", de: "Reiseplan", fr: "itinéraire", es: "itinerario" }, "family"),

    V("red", "colors", "beginner", "the colour of ripe strawberries or a stop light", "az érett eper vagy a stoplámpa színe", "成熟草莓或红灯的颜色", ["colour", "color", "pink", "piros", "szín", "szin", "红色", "颜色"], { en: "red", hu: "piros", zh: "红色", de: "rot", fr: "rouge", es: "rojo", it: "rosso", pt: "vermelho" }, "object"),
    V("blue", "colors", "beginner", "the colour of a clear daytime sky", "a derült nappali ég színe", "晴朗白天天空的颜色", ["colour", "color", "sky", "kék", "kek", "szín", "蓝色", "天空"], { en: "blue", hu: "kék", zh: "蓝色", de: "blau", fr: "bleu", es: "azul", it: "blu", pt: "azul" }, "object"),
    V("pale", "colors", "intermediate", "a light, soft version of a colour", "egy szín világos, halk változata", "某种颜色很浅、很淡的样子", ["light", "colour", "color", "soft", "halvány", "halvany", "szín", "淡", "浅", "颜色"], { en: "pale", hu: "halvány", zh: "淡色的", de: "blass", fr: "pâle", es: "pálido" }, "family"),
    V("shade", "colors", "intermediate", "a particular version of a colour, darker or lighter", "egy színnek egy adott, sötétebb vagy világosabb változata", "同一种颜色里偏深或偏浅的某一种", ["colour", "color", "tone", "árnyalat", "arnyalat", "szín", "色调", "颜色"], { en: "shade", hu: "árnyalat", zh: "色调", de: "Farbton", fr: "nuance", es: "tono" }, "family"),
    V("crimson", "colors", "advanced", "a deep, strong red", "egy mély, erős vörös", "又深又浓的红色", ["red", "dark", "colour", "bíbor", "bibor", "piros", "深红", "红色"], { en: "crimson", hu: "bíborvörös", zh: "深红色", de: "karmesinrot", fr: "cramoisi", es: "carmín" }, "family"),
    V("muted", "colors", "advanced", "a colour that has been softened, not bright", "egy tompított, nem élénk szín", "被压低、不鲜亮的颜色", ["soft", "dull", "pale", "colour", "tompa", "szín", "暗沉", "淡", "颜色"], { en: "muted", hu: "tompa színű", zh: "暗沉的", de: "gedämpft", fr: "sourd", es: "apagado" }, "opposite"),

    V("soup", "food", "beginner", "a hot, mostly liquid dish you eat with a spoon", "forró, kanállal evett, többnyire folyékony étel", "多用勺子喝的热的流质食物", ["spoon", "bowl", "cook", "leves", "kanál", "kanal", "汤", "勺"], { en: "soup", hu: "leves", zh: "汤", de: "Suppe", fr: "soupe", es: "sopa", it: "zuppa", pt: "sopa" }, "object"),
    V("salty", "food", "beginner", "tasting of salt", "sós ízű", "有盐的味道", ["salt", "taste", "food", "sós", "sos", "só", "so", "咸", "盐"], { en: "salty", hu: "sós", zh: "咸", de: "salzig", fr: "salé", es: "salado" }, "opposite"),
    V("leftover", "food", "intermediate", "food that remains after a meal and may be eaten later", "a megmaradt étel, amit később is meg lehet enni", "吃剩、可以留到以后再吃的食物", ["meal", "food", "save", "maradék", "maradek", "étel", "剩菜", "剩饭"], { en: "leftover", hu: "maradék", zh: "剩菜", de: "Reste", fr: "reste", es: "sobras" }, "family"),
    V("ripe", "food", "intermediate", "fruit or vegetables that are ready to eat", "gyümölcs vagy zöldség, ami már jó érett, ehető", "已经长到可以吃的水果或蔬菜", ["fruit", "ready", "sweet", "érett", "erett", "gyümölcs", "gyumolcs", "熟", "水果"], { en: "ripe", hu: "érett", zh: "成熟的", de: "reif", fr: "mûr", es: "maduro" }, "opposite"),
    V("savoury", "food", "advanced", "tasty in a salty or herby way, not sweet", "sós vagy fűszeres ízű, nem édes", "咸的或带香料的味道，不是甜的", ["salty", "herb", "salt", "sweet", "ízes", "izes", "sós", "咸香", "咸", "香料"], { en: "savoury", hu: "sós-fűszeres", zh: "咸香的", de: "herzhaft", fr: "salé", es: "salado" }, "opposite"),
    V("garnish", "food", "advanced", "a small extra on top of a dish, for looks or flavour", "egy apró ráadás az ételen, dísznek vagy íznek", "放在菜上作装饰或提味的一点配料", ["decorate", "plate", "herb", "díszítés", "diszites", "étel", "装饰", "配菜"], { en: "garnish", hu: "díszítés", zh: "装饰配菜", de: "Garnitur", fr: "garniture", es: "guarnición" }, "collocation"),

    V("coat", "clothes", "beginner", "a heavier jacket you wear over other clothes, often outdoors", "a többi ruha fölé vett, gyakran kinti vastagabb darab", "穿在其他衣服外面、常常出门时穿的厚外套", ["wear", "cold", "jacket", "kabát", "kabat", "ruha", "外套", "衣服"], { en: "coat", hu: "kabát", zh: "外套", de: "Mantel", fr: "manteau", es: "abrigo", it: "cappotto", pt: "casaco" }, "object"),
    V("shoes", "clothes", "beginner", "what you wear on your feet", "amit a lábadra veszel", "穿在脚上的东西", ["feet", "wear", "walk", "cipő", "cipo", "láb", "鞋", "脚"], { en: "shoes", hu: "cipő", zh: "鞋", de: "Schuhe", fr: "chaussures", es: "zapatos", it: "scarpe", pt: "sapatos" }, "object"),
    V("sleeve", "clothes", "intermediate", "the part of a shirt or coat that covers the arm", "az ing vagy kabát karra simuló része", "衬衫或外套上包住胳膊的部分", ["arm", "shirt", "coat", "ruhaujj", "ujj", "kabát", "袖子", "胳膊", "外套"], { en: "sleeve", hu: "ruhaujj", zh: "袖子", de: "Ärmel", fr: "manche", es: "manga" }, "family"),
    V("fabric", "clothes", "intermediate", "the cloth a piece of clothing is made from", "az anyag, amiből a ruha készül", "做衣服用的布料", ["cloth", "cotton", "shirt", "anyag", "ruha", "布料", "衣服"], { en: "fabric", hu: "anyag", zh: "布料", de: "Stoff", fr: "tissu", es: "tela" }, "family"),
    V("hem", "clothes", "advanced", "the finished edge at the bottom of a skirt, trouser leg or sleeve", "a szoknya, a nadrágszár vagy az ujj alsó, eldolgozott széle", "裙子、裤腿或袖口最下面折好的边", ["edge", "skirt", "sleeve", "szegély", "szegely", "ruha", "裙边", "袖子"], { en: "hem", hu: "szegély", zh: "褶边", de: "Saum", fr: "ourlet", es: "dobladillo" }, "family"),
    V("tailored", "clothes", "advanced", "cut and sewn to follow the shape of the body closely", "úgy szabott és varrt, hogy szépen követi a test formáját", "剪裁和缝制都贴合身体线条的", ["fit", "suit", "cut", "szabott", "ruha", "量身", "西装", "剪裁"], { en: "tailored", hu: "szabott", zh: "量身裁剪的", de: "tailliert", fr: "ajusté", es: "entallado" }, "collocation")
  ];


  var VOCAB_CORE = { kitchen: 1, weather: 1, body: 1, colors: 1, clothes: 1 };

  function themeLabelOf(theme, ui) {
    var row = THEME_LABEL[theme];
    return (row && (row[ui] || row.en)) || theme || "";
  }

  function normalizeLevel(raw) {
    var s = String(raw || "").toLowerCase().trim();
    if (/^(a1|a2|beginner|basic|kezdő|kezdo|初级|入门)/.test(s)) return "beginner";
    if (/^(c1|c2|advanced|fluent|haladó|halado|高级|流利)/.test(s)) return "advanced";
    if (/^(b1|b2|intermediate|középhaladó|kozephalado|középső|kozepso|中级)/.test(s)) return "intermediate";
    return "";
  }

  function inferLevel(ctx, texts) {
    ctx = ctx || {};
    var n = normalizeLevel(ctx.level);
    if (n) return n;
    var profile = ctx.profile;
    if (profile) {
      var practice = ctx.savedPractice || ctx.profilePractice || profile.practice || "";
      var list = profile.learning || [];
      var learn = null;
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i] && list[i].lang === practice) { learn = list[i]; break; }
      }
      if (!learn) learn = list[0];
      if (learn && learn.level) {
        n = normalizeLevel(learn.level);
        if (n) return n;
      }
      if (profile.level) {
        n = normalizeLevel(profile.level);
        if (n) return n;
      }
    }
    var msgs = texts || [];
    if (!msgs.length) return "intermediate";
    var user = msgs.join(" ");
    var avg = user.length / msgs.length;
    var complex = /because|although|however|which |that I|amely|azonban|\bbár\b|虽然|因为|但是|尽管/.test(user);
    var longWords = (user.match(/[A-Za-záéíóöőúüűÁÉÍÓÖŐÚÜŰ]{8,}/g) || []).length;
    if (avg < 28 && !complex) return "beginner";
    if (avg > 70 || (complex && avg > 45) || longWords >= 6) return "advanced";
    return "intermediate";
  }

  function knownTermSet(ctx, history, target) {
    var set = {};
    function add(s) {
      var k = String(s || "").toLowerCase().trim();
      if (k) set[k] = true;
    }
    var list = (ctx && ctx.knownWords) || [];
    var i;
    for (i = 0; i < list.length; i++) add(list[i] && list[i].term ? list[i].term : list[i]);
    (history || []).forEach(function (m) {
      if (!m || !m.content) return;
      tokenize(m.content).forEach(add);
    });
    return set;
  }

  function detectStruggles(history, current) {
    var texts = [];
    (history || []).forEach(function (m) {
      if (m && m.role === "user" && m.content) texts.push(String(m.content));
    });
    if (current) texts.push(String(current));
    var found = [];
    var patterns = [
      /what does ([a-záéíóöőúüű\-']+) mean/i,
      /mit jelent(?: az| a)?\s+([a-záéíóöőúüű\-']+)/i,
      /([A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű\u4e00-\u9fff]{2,})\s*(?:是什么意思|是什麼意思)/,
      /how do you say ([^?？]+)/i,
      /hogy mond(?:ják|od)\s+(?:az?t?,?\s+)?(.+?)(\?|$)/i,
      /(.+?)\s*怎么说/,
      /i (?:keep )?(?:forgetting|forgot|can't remember|cannot remember|don’t know|don't know)(?: how to say)?\s+(.+)/i,
      /elfelejtettem\s+(.+)/i,
      /忘了\s*(.+)/
    ];
    texts.forEach(function (s) {
      patterns.forEach(function (re) {
        var m = s.match(re);
        if (m && m[1]) found.push(m[1].trim().replace(/[.?!？！]+$/, "").slice(0, 48));
      });
      if (/(hard|difficult|struggle|stuck|nehéz|nehez|nem tudom|难|不懂|不会|卡住)/i.test(s)) {
        tokenize(s).forEach(function (w) {
          if (w.length > 3 && !/^(hard|difficult|struggle|stuck|nehéz|nehez|this|that|with|very|really|quite)$/i.test(w)) found.push(w);
        });
      }
    });
    return found;
  }

  function looksLikeList(text) {
    var s = String(text || "");
    var parts = s.split(/,|、| és | and | 和 | meg /i).map(function (x) { return x.trim(); }).filter(function (x) { return x.length > 1; });
    return parts.length >= 3;
  }

  function textHasTerm(low, tokens, term) {
    term = String(term || "").trim().toLowerCase();
    if (!term) return false;
    if (/[\u0400-\u9fff\u0600-\u06ff\u3040-\u30ff\uac00-\ud7af\u0900-\u097f\u0e00-\u0e7f\u0590-\u05ff]/.test(term)) {
      return low.indexOf(term) !== -1;
    }
    if (term.indexOf(" ") !== -1) return low.indexOf(term) !== -1;
    if (tokens[term]) return true;
    if (term.length >= 4) {
      var i, keys = Object.keys(tokens);
      for (i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(term) === 0) return true;
      }
    }
    return false;
  }

  function detectVocab(text, ctx) {
    ctx = ctx || {};
    var current = String(text || "");
    var recent = [];
    (ctx.history || []).forEach(function (m) {
      if (m && m.role === "user" && m.content) recent.push(String(m.content));
    });
    recent = recent.slice(-4);
    var all = recent.concat([current]).join(" ");
    var low = " " + all.toLowerCase() + " ";
    var curLow = " " + current.toLowerCase() + " ";
    var tokens = {};
    tokenize(all).forEach(function (w) { tokens[w] = true; });
    var curTokens = {};
    tokenize(current).forEach(function (w) { curTokens[w] = true; });

    var asked = false;
    var i, term;
    for (i = 0; i < VOCAB_ASK.length; i++) {
      if (textHasTerm(curLow, curTokens, VOCAB_ASK[i]) || textHasTerm(low, tokens, VOCAB_ASK[i])) {
        asked = true;
        break;
      }
    }
    // bare "words" / "szavak" / "词" as a strong ask when clearly about collecting words
    if (/\b(words|szavak)\b/.test(curLow) || curLow.indexOf("单词") !== -1 || curLow.indexOf("词汇") !== -1 || curLow.indexOf("词语") !== -1) asked = true;

    var themeHits = [];
    Object.keys(VOCAB_THEME_KEYS).forEach(function (theme) {
      var keys = VOCAB_THEME_KEYS[theme];
      var inCurrent = false, inRecent = false;
      keys.forEach(function (k) {
        if (textHasTerm(curLow, curTokens, k)) inCurrent = true;
        else if (textHasTerm(low, tokens, k)) inRecent = true;
      });
      if (inCurrent || inRecent) themeHits.push({ theme: theme, current: inCurrent, core: !!VOCAB_CORE[theme] });
    });
    var theme = "";
    var i2;
    for (i2 = 0; i2 < themeHits.length; i2++) {
      if (themeHits[i2].current) { theme = themeHits[i2].theme; break; }
    }
    if (!theme && themeHits.length) theme = themeHits[0].theme;

    var listed = looksLikeList(current);
    var manyNew = 0;
    if (listed) {
      tokenize(current).forEach(function (w) {
        if (w.length > 3) manyNew++;
      });
    }

    var strength = "";
    if (asked || (listed && (theme || manyNew >= 3))) strength = "strong";
    else if (theme && VOCAB_CORE[theme] && themeHits.some(function (h) { return h.theme === theme && h.current; })) strength = "medium";
    else if (theme && asked) strength = "strong";

    return {
      strength: strength,
      theme: theme,
      asked: asked,
      listed: listed,
      struggles: detectStruggles(ctx.history, current)
    };
  }

  function scoreVocabItem(item, opts) {
    var levels = { beginner: 0, intermediate: 1, advanced: 2 };
    var score = 0;
    var d = Math.abs((levels[item.level] || 1) - (levels[opts.level] || 1));
    score += d === 0 ? 6 : d === 1 ? 2 : -2;
    if (opts.theme && item.theme === opts.theme) score += 4;
    var hay = " " + String(opts.hay || "").toLowerCase() + " ";
    var rel = item.related || [];
    var r;
    for (r = 0; r < rel.length; r++) {
      if (!rel[r] || !hayHasTerm(hay, rel[r])) continue;
      score += 3;
      var rl = String(rel[r]).toLowerCase();
      if (rl !== String(opts.theme || "").toLowerCase() && rl.length >= 5) score += 3;
    }
    var word = item.words && (item.words[opts.target] || item.words.en) || "";
    var wordLow = String(word).toLowerCase();
    if (wordLow && opts.known && opts.known[wordLow]) score -= 12;
    if (wordLow && opts.used && opts.used[item.id]) score -= 10;
    if (wordLow && hayHasTerm(hay, wordLow)) score -= 4;
    var struggles = opts.struggles || [];
    var s, j;
    for (s = 0; s < struggles.length; s++) {
      var st = String(struggles[s] || "").toLowerCase();
      if (!st) continue;
      if (wordLow && (wordLow.indexOf(st) !== -1 || st.indexOf(wordLow) !== -1)) score += 6;
      for (j = 0; j < rel.length; j++) {
        var rj = String(rel[j] || "").toLowerCase();
        if (rj && (st.indexOf(rj) !== -1 || rj.indexOf(st) !== -1)) {
          score += 5;
          break;
        }
      }
    }
    return score;
  }

  function pickVocabItem(text, ctx, target, theme, level, struggles) {
    ctx = ctx || {};
    var state = loadState(ctx);
    var used = state.usedVocabIds || {};
    var known = knownTermSet(ctx, ctx.history, target);
    var hayParts = [];
    (ctx.history || []).forEach(function (m) {
      if (m && m.content) hayParts.push(String(m.content));
    });
    hayParts.push(String(text || ""));
    var hay = hayParts.join(" ");
    var opts = { level: level || "intermediate", theme: theme, hay: hay, known: known, used: used, struggles: struggles || [], target: target };
    var scored = [];
    VOCAB_ITEMS.forEach(function (item) {
      if (!item.words || !(item.words[target] || (target === "en" && item.words.en))) return;
      if (theme && item.theme !== theme && !(struggles && struggles.length && item.theme === theme)) {
        // allow related theme if struggles or strong relatedness later; still include same-theme plus high relatedness others
      }
      var sc = scoreVocabItem(item, opts);
      if (theme && item.theme !== theme) sc -= 3;
      scored.push({ item: item, score: sc });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    if (!scored.length || scored[0].score < 0) return null;
    var topScore = scored[0].score;
    var top = scored.filter(function (x) { return x.score === topScore; });
    var pick = top[0];
    if (top.length > 1) pick = top[Math.floor(rand(ctx) * top.length)];
    var example = null;
    var e;
    for (e = 0; e < scored.length; e++) {
      if (scored[e].item.id !== pick.item.id && scored[e].item.theme === pick.item.theme && (scored[e].item.words[target] || scored[e].item.words.en)) {
        example = scored[e].item;
        break;
      }
    }
    return { item: pick.item, score: pick.score, example: example, word: pick.item.words[target] || pick.item.words.en };
  }

  function hayHasTerm(hay, term) {
    term = String(term || "").toLowerCase();
    if (!term) return false;
    var h = " " + String(hay || "").toLowerCase() + " ";
    if (/[\u0400-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(term)) return h.indexOf(term) !== -1;
    var escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("(?:^|[^a-záéíóöőúüű])" + escaped + "(?:[^a-záéíóöőúüű]|$)", "i").test(h);
  }

  var GENERIC_THEME_WORDS = {
    kitchen: 1, weather: 1, body: 1, travel: 1, food: 1, clothes: 1,
    color: 1, colour: 1, colors: 1, colours: 1, konyha: 1, "időjárás": 1,
    ruha: 1, "颜色": 1, "厨房": 1, "天气": 1, "身体": 1, "旅行": 1, "食物": 1, "衣服": 1
  };

  function vocabSnippet(text, theme, ui) {
    var low = String(text || "").toLowerCase();
    var keys = (VOCAB_THEME_KEYS[theme] || []).slice().sort(function (a, b) { return b.length - a.length; });
    var found = "", i, k;
    for (i = 0; i < keys.length; i++) {
      k = keys[i];
      if (k.length < 3 || GENERIC_THEME_WORDS[k.toLowerCase()]) continue;
      if (hayHasTerm(low, k)) { found = k; break; }
    }
    if (!found) return "";
    if (ui === "en" && !/^(the|a|an)\s/i.test(found) && !/[\u0400-\u9fff]/.test(found)) found = "the " + found;
    return found;
  }

  function formatVocabQuestion(ui, target, ctx, vocab, picked, snippet) {
    if (!picked || !picked.item) return "";
    var thing = (picked.item.thing && (picked.item.thing[ui] || picked.item.thing.en)) || "";
    var hook = vocabSnippet(ctx && ctx._vocabSource || "", picked.item.theme || (vocab && vocab.theme), ui) || "";
    if (!hook && snippet && !/\b(useful words|vocabulary|szót|szavak|单词|词汇)\b/i.test(snippet) && !/^(like|some|szeretnék|我想)/i.test(snippet)) hook = snippet;
    var vars = {
      lang: langName(target, ui, ctx),
      theme: themeLabelOf(picked.item.theme || (vocab && vocab.theme), ui),
      thing: thing,
      snippet: hook,
      example: "",
      exampleMeaning: ""
    };
    var bank = (availableLines[ui] || availableLines.en);
    var list = bank.vocabQ || availableLines.en.vocabQ;
    var useSnippet = !!(vars.snippet && vars.snippet.length >= 3 && list[3]);
    var idx = useSnippet ? 3 : Math.min(list.length - 1, Math.floor(rand(ctx) * 3));
    if (idx === 3 && !useSnippet) idx = 0;
    var line = fill(list[idx], vars);
    var offer = picked.example && (picked.example.words[target] || picked.example.words.en);
    if (offer && bank.vocabQExample && rand(ctx) < 0.55) {
      vars.example = offer;
      vars.exampleMeaning = (picked.example.thing && (picked.example.thing[ui] || picked.example.thing.en)) || "";
      line = joinSpoken([line, fill(bank.vocabQExample[0], vars)], ui);
    }
    return line;
  }


  function pickMove(state, ctx) {
    var last = state.lastMove || "";
    var lastQ = !!state.lastHadQuestion;
    var lastTeach = state.lastReplyKind === "teach" || state.lastReplyKind === "opener";
    var signal = ctx && ctx.vocabSignal || "";
    var vocabW = lastQ ? 0 : signal === "strong" ? 6 : signal === "medium" ? 4 : 0;
    var moves = [
      { id: "react", weight: 3 },
      { id: "lesson", weight: lastTeach ? 0 : 2 },
      { id: "tip", weight: 2 },
      { id: "question", weight: lastQ ? 0 : 3 },
      { id: "vocabQuestion", weight: vocabW },
      { id: "switch", weight: 2 }
    ];
    if (ctx && ctx.forceMove) return ctx.forceMove;
    var opts = moves.filter(function (m) { return m.weight > 0 && m.id !== last; });
    if (!opts.length) opts = moves.filter(function (m) { return m.weight > 0; });
    if (!opts.length) opts = moves;
    var total = 0;
    opts.forEach(function (m) { total += m.weight; });
    var r = rand(ctx) * total;
    var acc = 0;
    var i;
    for (i = 0; i < opts.length; i++) {
      acc += opts[i].weight;
      if (r < acc) return opts[i].id;
    }
    return opts[opts.length - 1].id;
  }

  function topicComment(fr, topic) {
    if (topic === "food") return fr.topicFood;
    if (topic === "travel") return fr.topicTravel;
    if (topic === "hobby") return fr.topicHobby;
    if (topic === "work") return fr.topicWork;
    if (topic === "daily") return fr.topicDaily;
    if (topic === "hard") return fr.hardAck;
    if (topic === "thanks") return fr.thanks;
    if (topic === "greet") return fr.greet;
    if (topic === "yes") return fr.yes;
    return "";
  }

  function dropQuestions(s) {
    var raw = String(s || "");
    var out = [];
    var buf = "";
    var i, ch;
    for (i = 0; i < raw.length; i++) {
      ch = raw[i];
      buf += ch;
      if (ch === "." || ch === "!" || ch === "。" || ch === "！") {
        if (buf.trim() && !hasQuestion(buf)) out.push(buf.trim());
        buf = "";
      }
    }
    if (buf.trim() && !hasQuestion(buf)) out.push(buf.trim());
    return out.join(" ").trim();
  }

  function tutorReply(text, ctx) {
    ctx = ctx || {};
    var ui = uiOf(ctx);
    var state = loadState(ctx);
    var inferred = inferLanguage(text, ctx);
    var target = inferred.lang || ui;
    if (inferred.named) target = inferred.named;
    var fr = frames(ui);
    var texts = userTexts(ctx.history, text);
    var n = texts.length;
    var snippet = snippetFrom(text);
    var vars = { n: n, lang: langName(target, ui, ctx), word: newWordIn(texts) || "", snippet: snippet };
    var topic = topicOf(text);
    var vocab = detectVocab(text, ctx);
    var level = inferLevel(ctx, texts);
    ctx.vocabSignal = vocab.strength;
    var move = pickMove(state, ctx);
    var parts = [];
    var usedTeach = false;
    var usedAvailable = false;

    if (inferred.named) {
      parts.push(fill(fr.wantLang, { lang: langName(target, ui, ctx) }));
    }

    if (move === "react") {
      var react = topicComment(fr, topic);
      if (!react && snippet) react = pickAvailable(ui, "contextComment", state, vars, true);
      if (!react) react = pickAvailable(ui, "comment", state, vars, true);
      if (react && longerThanBefore(texts)) {
        var prog = pickAvailable(ui, "progress", state, vars, true);
        if (prog && !hasQuestion(prog)) react = prog;
      } else if (react && vars.word && n >= 2 && rand(ctx) < 0.35) {
        var wordLine = fill((availableLines[ui] || availableLines.en).progress[2], vars);
        if (wordLine && !hasQuestion(wordLine)) react = wordLine;
      }
      if (react) parts.push(dropQuestions(react) || react);
      usedAvailable = !topic;
    } else if (move === "lesson") {
      var moment = nextMoment(target, state, true);
      var teach = formatTeach(ui, target, moment, "mini", ctx);
      if (teach) {
        parts.push(dropQuestions(teach) || teach);
        usedTeach = true;
      } else {
        parts.push(pickAvailable(ui, "tip", state, vars, true));
        usedAvailable = true;
      }
    } else if (move === "tip") {
      var tipCat = rand(ctx) < 0.5 ? "tip" : "encourage";
      if (state.lastBucket && String(state.lastBucket).indexOf(tipCat) !== -1) tipCat = tipCat === "tip" ? "encourage" : "tip";
      parts.push(pickAvailable(ui, tipCat, state, vars, true));
      usedAvailable = true;
    } else if (move === "vocabQuestion") {
      var pickedV = pickVocabItem(text, ctx, target, vocab.theme, level, vocab.struggles);
      ctx._vocabSource = text;
      var vq = formatVocabQuestion(ui, target, ctx, vocab, pickedV, snippet);
      if (vq) {
        parts.push(vq);
        if (!state.usedVocabIds) state.usedVocabIds = {};
        if (pickedV && pickedV.item) state.usedVocabIds[pickedV.item.id] = true;
        usedAvailable = true;
      } else {
        move = "question";
      }
    }
    if (move === "question") {
      var q = "";
      if (inferred.maybeSwitch && rand(ctx) < 0.4) {
        q = maybeLangCheck(ui, inferred, state, ctx, n);
      }
      if (!q && snippet) q = pickAvailable(ui, "contextQ", state, vars, true);
      if (!q && topic && (topic === "food" || topic === "travel" || topic === "hobby" || topic === "work" || topic === "daily" || topic === "hard")) {
        q = pickAvailable(ui, topic === "hard" ? "hard" : topic, state, vars, true);
      }
      if (!q) q = pickAvailable(ui, "daily", state, vars, true);
      if (q) parts.push(q);
      usedAvailable = !snippet;
    } else if (move === "switch") {
      parts.push(pickAvailable(ui, "switch", state, vars, true));
      usedAvailable = true;
    }

    if (!parts.length) {
      // Free-form has nothing to add: draw on available lines.
      parts.push(pickAvailable(ui, "comment", state, vars, true));
      usedAvailable = true;
      move = "react";
    }

    var textOut = joinSpoken(parts, ui);
    if (move !== "question" && move !== "vocabQuestion") {
      textOut = dropQuestions(textOut);
      if (!textOut || hasQuestion(textOut)) textOut = pickAvailable(ui, "comment", state, vars, true) || textOut;
    }

    state.lastMove = move;
    state.lastHadQuestion = hasQuestion(textOut);
    state.lastReplyKind = usedTeach ? "teach" : "chat";
    saveState(ctx, state);

    return {
      text: textOut,
      lang: ui,
      target: target,
      inferredPractice: inferred.inferredNew ? target : "",
      maybeSwitch: !!inferred.maybeSwitch,
      kind: usedTeach ? "teach" : move,
      move: move,
      usedAvailable: usedAvailable
    };
  }

  function replyFromWorker(res, localFn) {
    var text = res && res.ok && res.data && typeof res.data.reply === "string" ? String(res.data.reply).trim() : "";
    if (text) {
      return {
        source: "worker",
        text: text,
        lang: res.data && res.data.lang || ""
      };
    }
    if (res && res.status === 429) return { source: "limit", text: "" };
    var local = typeof localFn === "function" ? localFn() : null;
    if (local && local.text) {
      return {
        source: "local",
        text: local.text,
        lang: local.lang || "",
        kind: local.kind,
        move: local.move,
        target: local.target
      };
    }
    return { source: "failed", text: "" };
  }

  function categoryCounts() {
    var cats = {};
    var sample = availableLines.en;
    Object.keys(sample).forEach(function (k) { cats[k] = sample[k].length; });
    var teach = {};
    var totalTeach = 0;
    Object.keys(teachingMoments).forEach(function (lang) {
      teach[lang] = teachingMoments[lang].length;
      totalTeach += teachingMoments[lang].length;
    });
    return { available: cats, teachingMoments: teach, teachingTotal: totalTeach, targetLanguages: Object.keys(teachingMoments).length };
  }

  var api = {
    TUTOR_BRIEF: TUTOR_BRIEF,
    availableLines: availableLines,
    teachingMoments: teachingMoments,
    inferLanguage: inferLanguage,
    teachingOpener: teachingOpener,
    tutorReply: tutorReply,
    replyFromWorker: replyFromWorker,
    detectVocab: detectVocab,
    inferLevel: inferLevel,
    pickVocabItem: pickVocabItem,
    formatTeach: formatTeach,
    categoryCounts: categoryCounts,
    langName: langName
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.YibuTutor = api;
})(typeof self !== "undefined" ? self : this);
