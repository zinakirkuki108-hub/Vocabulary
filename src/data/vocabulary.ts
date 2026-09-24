export interface WordItem {
  id: string;
  english: string;
  arabic: string;
  emoji: string;
  category: string;
  phonetic?: string;
}

export const VOCABULARY_LIST: WordItem[] = [
  // Basic Examples from prompt & Daily Objects
  { id: 'book', english: 'Book', arabic: 'كِتَاب', emoji: '📖', category: 'أدوات ومدرسة', phonetic: '/bʊk/' },
  { id: 'car', english: 'Car', arabic: 'سَيَّارَة', emoji: '🚗', category: 'مواصلات', phonetic: '/kɑːr/' },
  { id: 'water', english: 'Water', arabic: 'مَاء', emoji: '💧', category: 'طعام وشراب', phonetic: '/ˈwɔːtər/' },
  { id: 'pen', english: 'Pen', arabic: 'قَلَم', emoji: '🖊️', category: 'أدوات ومدرسة', phonetic: '/pɛn/' },
  { id: 'pencil', english: 'Pencil', arabic: 'قَلَم رَصَاص', emoji: '✏️', category: 'أدوات ومدرسة', phonetic: '/ˈpɛnsəl/' },
  { id: 'notebook', english: 'Notebook', arabic: 'دَفْتَر', emoji: '📓', category: 'أدوات ومدرسة', phonetic: '/ˈnoʊtbʊk/' },
  { id: 'bag', english: 'Bag', arabic: 'حَقِيبَة', emoji: '🎒', category: 'أدوات ومدرسة', phonetic: '/bæɡ/' },
  { id: 'door', english: 'Door', arabic: 'بَاب', emoji: '🚪', category: 'المنزل', phonetic: '/dɔːr/' },
  { id: 'window', english: 'Window', arabic: 'نَافِذَة', emoji: '🪟', category: 'المنزل', phonetic: '/ˈwɪndoʊ/' },
  { id: 'key', english: 'Key', arabic: 'مِفْتَاح', emoji: '🔑', category: 'المنزل', phonetic: '/kiː/' },
  { id: 'house', english: 'House', arabic: 'مَنْزِل', emoji: '🏠', category: 'المنزل', phonetic: '/haʊs/' },
  { id: 'room', english: 'Room', arabic: 'غُرْفَة', emoji: '🚪', category: 'المنزل', phonetic: '/ruːm/' },
  { id: 'table', english: 'Table', arabic: 'طَاوِلَة', emoji: '🪵', category: 'أثاث', phonetic: '/ˈteɪbəl/' },
  { id: 'chair', english: 'Chair', arabic: 'كُرْسِيّ', emoji: '🪑', category: 'أثاث', phonetic: '/tʃɛər/' },
  { id: 'bed', english: 'Bed', arabic: 'سَرِير', emoji: '🛏️', category: 'أثاث', phonetic: '/bɛd/' },
  { id: 'lamp', english: 'Lamp', arabic: 'مِصْبَاح', emoji: '💡', category: 'المنزل', phonetic: '/læmp/' },
  { id: 'clock', english: 'Clock', arabic: 'سَاعَة', emoji: '⏰', category: 'أدوات', phonetic: '/klɒk/' },
  { id: 'phone', english: 'Phone', arabic: 'هَاتِف', emoji: '📱', category: 'تقنية', phonetic: '/foʊn/' },
  { id: 'computer', english: 'Computer', arabic: 'حَاسُوب', emoji: '💻', category: 'تقنية', phonetic: '/kəmˈpjuːtər/' },
  { id: 'camera', english: 'Camera', arabic: 'كَامِيرَا', emoji: '📷', category: 'تقنية', phonetic: '/ˈkæmərə/' },
  { id: 'headphones', english: 'Headphones', arabic: 'سَمَّاعَات', emoji: '🎧', category: 'تقنية', phonetic: '/ˈhɛdfoʊnz/' },
  { id: 'mirror', english: 'Mirror', arabic: 'مِرْآة', emoji: '🪞', category: 'المنزل', phonetic: '/ˈmɪrər/' },
  { id: 'cup', english: 'Cup', arabic: 'كُوب', emoji: '☕', category: 'طعام وشراب', phonetic: '/kʌp/' },
  { id: 'glass', english: 'Glass', arabic: 'كَأْس', emoji: '🥛', category: 'طعام وشراب', phonetic: '/ɡlæs/' },
  { id: 'spoon', english: 'Spoon', arabic: 'مِلْعَقَة', emoji: '🥄', category: 'طعام وشراب', phonetic: '/spuːn/' },
  { id: 'fork', english: 'Fork', arabic: 'شَوْكَة', emoji: '🍴', category: 'طعام وشراب', phonetic: '/fɔːrk/' },
  { id: 'knife', english: 'Knife', arabic: 'سِكِّين', emoji: '🔪', category: 'طعام وشراب', phonetic: '/naɪf/' },
  { id: 'plate', english: 'Plate', arabic: 'صَحْن', emoji: '🍽️', category: 'طعام وشراب', phonetic: '/pleɪt/' },
  { id: 'glasses', english: 'Glasses', arabic: 'نَظَّارَة', emoji: '👓', category: 'شخصي', phonetic: '/ˈɡlæsɪz/' },
  { id: 'umbrella', english: 'Umbrella', arabic: 'مِظَلَّة', emoji: '☂️', category: 'شخصي', phonetic: '/ʌmˈbrɛlə/' },
  { id: 'wallet', english: 'Wallet', arabic: 'مِحْفَظَة', emoji: '👛', category: 'شخصي', phonetic: '/ˈwɒlɪt/' },
  { id: 'money', english: 'Money', arabic: 'نُقُود', emoji: '💵', category: 'شخصي', phonetic: '/ˈmʌni/' },

  // Food & Drinks
  { id: 'bread', english: 'Bread', arabic: 'خُبْز', emoji: '🍞', category: 'طعام وشراب', phonetic: '/brɛd/' },
  { id: 'milk', english: 'Milk', arabic: 'حَلِيب', emoji: '🥛', category: 'طعام وشراب', phonetic: '/mɪlk/' },
  { id: 'tea', english: 'Tea', arabic: 'شَاي', emoji: '🍵', category: 'طعام وشراب', phonetic: '/tiː/' },
  { id: 'coffee', english: 'Coffee', arabic: 'قَهْوَة', emoji: '☕', category: 'طعام وشراب', phonetic: '/ˈkɔːfi/' },
  { id: 'juice', english: 'Juice', arabic: 'عَصِير', emoji: '🧃', category: 'طعام وشراب', phonetic: '/dʒuːs/' },
  { id: 'apple', english: 'Apple', arabic: 'تُفَّاحَة', emoji: '🍎', category: 'طعام وشراب', phonetic: '/ˈæpəl/' },
  { id: 'banana', english: 'Banana', arabic: 'مَوْزَة', emoji: '🍌', category: 'طعام وشراب', phonetic: '/bəˈnænə/' },
  { id: 'orange', english: 'Orange', arabic: 'بُرْتُقَال', emoji: '🍊', category: 'طعام وشراب', phonetic: '/ˈɔːrɪndʒ/' },
  { id: 'grapes', english: 'Grapes', arabic: 'عِنَب', emoji: '🍇', category: 'طعام وشراب', phonetic: '/ɡreɪps/' },
  { id: 'lemon', english: 'Lemon', arabic: 'لَيْمُون', emoji: '🍋', category: 'طعام وشراب', phonetic: '/ˈlɛmən/' },
  { id: 'strawberry', english: 'Strawberry', arabic: 'فَرَاوْلَة', emoji: '🍓', category: 'طعام وشراب', phonetic: '/ˈstrɔːbɛri/' },
  { id: 'egg', english: 'Egg', arabic: 'بَيْضَة', emoji: '🥚', category: 'طعام وشراب', phonetic: '/ɛɡ/' },
  { id: 'cheese', english: 'Cheese', arabic: 'جُبْن', emoji: '🧀', category: 'طعام وشراب', phonetic: '/tʃiːz/' },
  { id: 'meat', english: 'Meat', arabic: 'لَحْم', emoji: '🥩', category: 'طعام وشراب', phonetic: '/miːt/' },
  { id: 'chicken', english: 'Chicken', arabic: 'دَجَاج', emoji: '🍗', category: 'طعام وشراب', phonetic: '/ˈtʃɪkɪn/' },
  { id: 'fish', english: 'Fish', arabic: 'سَمَك', emoji: '🐟', category: 'طعام وشراب', phonetic: '/fɪʃ/' },
  { id: 'rice', english: 'Rice', arabic: 'أَرُزّ', emoji: '🍚', category: 'طعام وشراب', phonetic: '/raɪs/' },
  { id: 'salt', english: 'Salt', arabic: 'مِلْح', emoji: '🧂', category: 'طعام وشراب', phonetic: '/sɔːlt/' },
  { id: 'sugar', english: 'Sugar', arabic: 'سُكَّر', emoji: '🍬', category: 'طعام وشراب', phonetic: '/ˈʃʊɡər/' },
  { id: 'honey', english: 'Honey', arabic: 'عَسَل', emoji: '🍯', category: 'طعام وشراب', phonetic: '/ˈhʌni/' },
  { id: 'cake', english: 'Cake', arabic: 'كَعْكَة', emoji: '🍰', category: 'طعام وشراب', phonetic: '/keɪk/' },
  { id: 'soup', english: 'Soup', arabic: 'حَسَاء', emoji: '🍲', category: 'طعام وشراب', phonetic: '/suːp/' },
  { id: 'pizza', english: 'Pizza', arabic: 'بِيتْزَا', emoji: '🍕', category: 'طعام وشراب', phonetic: '/ˈpiːtsə/' },
  { id: 'olive', english: 'Olive', arabic: 'زَيْتُون', emoji: '🫒', category: 'طعام وشراب', phonetic: '/ˈɒlɪv/' },

  // Animals & Nature
  { id: 'cat', english: 'Cat', arabic: 'قِطَّة', emoji: '🐱', category: 'حيوانات', phonetic: '/kæt/' },
  { id: 'dog', english: 'Dog', arabic: 'كَلْب', emoji: '🐶', category: 'حيوانات', phonetic: '/dɒɡ/' },
  { id: 'bird', english: 'Bird', arabic: 'عُصْفُور', emoji: '🐦', category: 'حيوانات', phonetic: '/bɜːrd/' },
  { id: 'horse', english: 'Horse', arabic: 'حِصَان', emoji: '🐴', category: 'حيوانات', phonetic: '/hɔːrs/' },
  { id: 'lion', english: 'Lion', arabic: 'أَسَد', emoji: '🦁', category: 'حيوانات', phonetic: '/ˈlaɪən/' },
  { id: 'tiger', english: 'Tiger', arabic: 'نَمِر', emoji: '🐯', category: 'حيوانات', phonetic: '/ˈtaɪɡər/' },
  { id: 'elephant', english: 'Elephant', arabic: 'فِيل', emoji: '🐘', category: 'حيوانات', phonetic: '/ˈɛlɪfənt/' },
  { id: 'camel', english: 'Camel', arabic: 'جَمَل', emoji: '🐪', category: 'حيوانات', phonetic: '/ˈkæməl/' },
  { id: 'rabbit', english: 'Rabbit', arabic: 'أَرْنَب', emoji: '🐰', category: 'حيوانات', phonetic: '/ˈræbɪt/' },
  { id: 'sheep', english: 'Sheep', arabic: 'خَرُوف', emoji: '🐑', category: 'حيوانات', phonetic: '/ʃiːp/' },
  { id: 'cow', english: 'Cow', arabic: 'بَقَرَة', emoji: '🐮', category: 'حيوانات', phonetic: '/kaʊ/' },
  { id: 'monkey', english: 'Monkey', arabic: 'قِرْد', emoji: '🐒', category: 'حيوانات', phonetic: '/ˈmʌŋki/' },
  { id: 'mouse', english: 'Mouse', arabic: 'فَأْر', emoji: '🐭', category: 'حيوانات', phonetic: '/maʊs/' },
  { id: 'duck', english: 'Duck', arabic: 'بَطَّة', emoji: '🦆', category: 'حيوانات', phonetic: '/dʌk/' },
  { id: 'bee', english: 'Bee', arabic: 'نَحْلَة', emoji: '🐝', category: 'حيوانات', phonetic: '/biː/' },
  { id: 'butterfly', english: 'Butterfly', arabic: 'فَرَاشَة', emoji: '🦋', category: 'حيوانات', phonetic: '/ˈbʌtərflaɪ/' },
  { id: 'falcon', english: 'Falcon', arabic: 'صَقْر', emoji: '🦅', category: 'حيوانات', phonetic: '/ˈfɔːlkən/' },
  { id: 'wolf', english: 'Wolf', arabic: 'ذِئْب', emoji: '🐺', category: 'حيوانات', phonetic: '/wʊlf/' },
  { id: 'bear', english: 'Bear', arabic: 'دُبّ', emoji: '🐻', category: 'حيوانات', phonetic: '/bɛər/' },
  { id: 'snake', english: 'Snake', arabic: 'ثُعْبَان', emoji: '🐍', category: 'حيوانات', phonetic: '/sneɪk/' },

  // Nature & Weather
  { id: 'sun', english: 'Sun', arabic: 'شَمْس', emoji: '☀️', category: 'طبيعة وطقس', phonetic: '/sʌn/' },
  { id: 'moon', english: 'Moon', arabic: 'قَمَر', emoji: '🌙', category: 'طبيعة وطقس', phonetic: '/muːn/' },
  { id: 'star', english: 'Star', arabic: 'نَجْمَة', emoji: '⭐', category: 'طبيعة وطقس', phonetic: '/stɑːr/' },
  { id: 'sky', english: 'Sky', arabic: 'سَمَاء', emoji: '🌌', category: 'طبيعة وطقس', phonetic: '/skaɪ/' },
  { id: 'cloud', english: 'Cloud', arabic: 'سَحَابَة', emoji: '☁️', category: 'طبيعة وطقس', phonetic: '/klaʊd/' },
  { id: 'rain', english: 'Rain', arabic: 'مَطَر', emoji: '🌧️', category: 'طبيعة وطقس', phonetic: '/reɪn/' },
  { id: 'snow', english: 'Snow', arabic: 'ثَلْج', emoji: '❄️', category: 'طبيعة وطقس', phonetic: '/snoʊ/' },
  { id: 'wind', english: 'Wind', arabic: 'رِيح', emoji: '💨', category: 'طبيعة وطقس', phonetic: '/wɪnd/' },
  { id: 'fire', english: 'Fire', arabic: 'نَار', emoji: '🔥', category: 'طبيعة وطقس', phonetic: '/ˈfaɪər/' },
  { id: 'tree', english: 'Tree', arabic: 'شَجَرَة', emoji: '🌳', category: 'طبيعة وطقس', phonetic: '/triː/' },
  { id: 'flower', english: 'Flower', arabic: 'زَهْرَة', emoji: '🌸', category: 'طبيعة وطقس', phonetic: '/ˈflaʊər/' },
  { id: 'rose', english: 'Rose', arabic: 'وَرْدَة', emoji: '🌹', category: 'طبيعة وطقس', phonetic: '/roʊz/' },
  { id: 'sea', english: 'Sea', arabic: 'بَحْر', emoji: '🌊', category: 'طبيعة وطقس', phonetic: '/siː/' },
  { id: 'river', english: 'River', arabic: 'نَهْر', emoji: '🏞️', category: 'طبيعة وطقس', phonetic: '/ˈrɪvər/' },
  { id: 'mountain', english: 'Mountain', arabic: 'جَبَل', emoji: '⛰️', category: 'طبيعة وطقس', phonetic: '/ˈmaʊntɪn/' },
  { id: 'desert', english: 'Desert', arabic: 'صَحْرَاء', emoji: '🏜️', category: 'طبيعة وطقس', phonetic: '/ˈdɛzərt/' },
  { id: 'earth', english: 'Earth', arabic: 'أَرْض', emoji: '🌍', category: 'طبيعة وطقس', phonetic: '/ɜːrθ/' },
  { id: 'island', english: 'Island', arabic: 'جَزِيرَة', emoji: '🏝️', category: 'طبيعة وطقس', phonetic: '/ˈaɪlənd/' },
  { id: 'forest', english: 'Forest', arabic: 'غَابَة', emoji: '🌲', category: 'طبيعة وطقس', phonetic: '/ˈfɒrɪst/' },

  // Places & Transportation
  { id: 'school', english: 'School', arabic: 'مَدْرَسَة', emoji: '🏫', category: 'أماكن ومواصلات', phonetic: '/skuːl/' },
  { id: 'hospital', english: 'Hospital', arabic: 'مُسْتَشْفَى', emoji: '🏥', category: 'أماكن ومواصلات', phonetic: '/ˈhɒspɪtəl/' },
  { id: 'mosque', english: 'Mosque', arabic: 'مَسْجِد', emoji: '🕌', category: 'أماكن ومواصلات', phonetic: '/mɒsk/' },
  { id: 'market', english: 'Market', arabic: 'سُوق', emoji: '🏬', category: 'أماكن ومواصلات', phonetic: '/ˈmɑːrkɪt/' },
  { id: 'street', english: 'Street', arabic: 'شَارِع', emoji: '🛣️', category: 'أماكن ومواصلات', phonetic: '/striːt/' },
  { id: 'city', english: 'City', arabic: 'مَدِينَة', emoji: '🏙️', category: 'أماكن ومواصلات', phonetic: '/ˈsɪti/' },
  { id: 'airport', english: 'Airport', arabic: 'مَطَار', emoji: '🛫', category: 'أماكن ومواصلات', phonetic: '/ˈɛərpɔːrt/' },
  { id: 'plane', english: 'Airplane', arabic: 'طَائِرَة', emoji: '✈️', category: 'أماكن ومواصلات', phonetic: '/ˈɛərpleɪn/' },
  { id: 'train', english: 'Train', arabic: 'قِطَار', emoji: '🚆', category: 'أماكن ومواصلات', phonetic: '/treɪn/' },
  { id: 'bus', english: 'Bus', arabic: 'حَافِلَة', emoji: '🚌', category: 'أماكن ومواصلات', phonetic: '/bʌs/' },
  { id: 'bicycle', english: 'Bicycle', arabic: 'دَرَّاجَة', emoji: '🚲', category: 'أماكن ومواصلات', phonetic: '/ˈbaɪsɪkəl/' },
  { id: 'boat', english: 'Boat', arabic: 'قَارِب', emoji: '⛵', category: 'أماكن ومواصلات', phonetic: '/boʊt/' },
  { id: 'ship', english: 'Ship', arabic: 'سَفِينَة', emoji: '🚢', category: 'أماكن ومواصلات', phonetic: '/ʃɪp/' },
  { id: 'bridge', english: 'Bridge', arabic: 'جِسْر', emoji: '🌉', category: 'أماكن ومواصلات', phonetic: '/brɪdʒ/' },

  // People & Family
  { id: 'father', english: 'Father', arabic: 'أَب', emoji: '👨', category: 'العائلة', phonetic: '/ˈfɑːðər/' },
  { id: 'mother', english: 'Mother', arabic: 'أُمّ', emoji: '👩', category: 'العائلة', phonetic: '/ˈmʌðər/' },
  { id: 'brother', english: 'Brother', arabic: 'أَخ', emoji: '👦', category: 'العائلة', phonetic: '/ˈbrʌðər/' },
  { id: 'sister', english: 'Sister', arabic: 'أُخْت', emoji: '👧', category: 'العائلة', phonetic: '/ˈsɪstər/' },
  { id: 'son', english: 'Son', arabic: 'اِبْن', emoji: '👦', category: 'العائلة', phonetic: '/sʌn/' },
  { id: 'daughter', english: 'Daughter', arabic: 'اِبْنَة', emoji: '👧', category: 'العائلة', phonetic: '/ˈdɔːtər/' },
  { id: 'grandfather', english: 'Grandfather', arabic: 'جَدّ', emoji: '👴', category: 'العائلة', phonetic: '/ˈɡrændˌfɑːðər/' },
  { id: 'grandmother', english: 'Grandmother', arabic: 'جَدَّة', emoji: '👵', category: 'العائلة', phonetic: '/ˈɡrændˌmʌðər/' },
  { id: 'friend', english: 'Friend', arabic: 'صَدِيق', emoji: '🤝', category: 'العائلة', phonetic: '/frɛnd/' },
  { id: 'child', english: 'Child', arabic: 'طِفْل', emoji: '👶', category: 'العائلة', phonetic: '/tʃaɪld/' },
  { id: 'man', english: 'Man', arabic: 'رَجُل', emoji: '🧔', category: 'أشخاص', phonetic: '/mæn/' },
  { id: 'woman', english: 'Woman', arabic: 'امْرَأَة', emoji: '👩', category: 'أشخاص', phonetic: '/ˈwʊmən/' },
  { id: 'boy', english: 'Boy', arabic: 'وَلَد', emoji: '👦', category: 'أشخاص', phonetic: '/bɔɪ/' },
  { id: 'girl', english: 'Girl', arabic: 'بِنْت', emoji: '👧', category: 'أشخاص', phonetic: '/ɡɜːrl/' },
  { id: 'teacher', english: 'Teacher', arabic: 'مُعَلِّم', emoji: '👨‍🏫', category: 'مهن', phonetic: '/ˈtiːtʃər/' },
  { id: 'student', english: 'Student', arabic: 'طَالِب', emoji: '👨‍🎓', category: 'مهن', phonetic: '/ˈstjuːdənt/' },
  { id: 'doctor', english: 'Doctor', arabic: 'طَبِيب', emoji: '👨‍⚕️', category: 'مهن', phonetic: '/ˈdɒktər/' },
  { id: 'engineer', english: 'Engineer', arabic: 'مُهَنْدِس', emoji: '👷', category: 'مهن', phonetic: '/ˌɛndʒɪˈnɪər/' },
  { id: 'policeman', english: 'Policeman', arabic: 'شُرْطِيّ', emoji: '👮', category: 'مهن', phonetic: '/pəˈliːsmən/' },
  { id: 'nurse', english: 'Nurse', arabic: 'مُمَرِّضَة', emoji: '👩‍⚕️', category: 'مهن', phonetic: '/nɜːrs/' },

  // Body Parts
  { id: 'head', english: 'Head', arabic: 'رَأْس', emoji: '🗣️', category: 'جسم الإنسان', phonetic: '/hɛd/' },
  { id: 'eye', english: 'Eye', arabic: 'عَيْن', emoji: '👁️', category: 'جسم الإنسان', phonetic: '/aɪ/' },
  { id: 'ear', english: 'Ear', arabic: 'أُذُن', emoji: '👂', category: 'جسم الإنسان', phonetic: '/ɪər/' },
  { id: 'nose', english: 'Nose', arabic: 'أَنْف', emoji: '👃', category: 'جسم الإنسان', phonetic: '/noʊz/' },
  { id: 'mouth', english: 'Mouth', arabic: 'فَم', emoji: '👄', category: 'جسم الإنسان', phonetic: '/maʊθ/' },
  { id: 'tooth', english: 'Tooth', arabic: 'سِنّ', emoji: '🦷', category: 'جسم الإنسان', phonetic: '/tuːθ/' },
  { id: 'hand', english: 'Hand', arabic: 'يَد', emoji: '✋', category: 'جسم الإنسان', phonetic: '/hænd/' },
  { id: 'foot', english: 'Foot', arabic: 'قَدَم', emoji: '🦶', category: 'جسم الإنسان', phonetic: '/fʊt/' },
  { id: 'leg', english: 'Leg', arabic: 'سَاق', emoji: '🦵', category: 'جسم الإنسان', phonetic: '/lɛɡ/' },
  { id: 'heart', english: 'Heart', arabic: 'قَلْب', emoji: '❤️', category: 'جسم الإنسان', phonetic: '/hɑːrt/' },
  { id: 'hair', english: 'Hair', arabic: 'شَعْر', emoji: '💇', category: 'جسم الإنسان', phonetic: '/hɛər/' },
  { id: 'finger', english: 'Finger', arabic: 'إِصْبَع', emoji: '👆', category: 'جسم الإنسان', phonetic: '/ˈfɪŋɡər/' },

  // Clothes
  { id: 'shirt', english: 'Shirt', arabic: 'قَمِيص', emoji: '👕', category: 'ملابس', phonetic: '/ʃɜːrt/' },
  { id: 'pants', english: 'Pants', arabic: 'بِنْطَال', emoji: '👖', category: 'ملابس', phonetic: '/pænts/' },
  { id: 'dress', english: 'Dress', arabic: 'فُسْتَان', emoji: '👗', category: 'ملابس', phonetic: '/drɛs/' },
  { id: 'coat', english: 'Coat', arabic: 'مِعْطَف', emoji: '🧥', category: 'ملابس', phonetic: '/koʊt/' },
  { id: 'shoes', english: 'Shoes', arabic: 'حِذَاء', emoji: '👟', category: 'ملابس', phonetic: '/ʃuːz/' },
  { id: 'hat', english: 'Hat', arabic: 'قُبَّعَة', emoji: '🧢', category: 'ملابس', phonetic: '/hæt/' },
  { id: 'socks', english: 'Socks', arabic: 'جَوْرَب', emoji: '🧦', category: 'ملابس', phonetic: '/sɒks/' },

  // Colors & Numbers
  { id: 'red', english: 'Red', arabic: 'أَحْمَر', emoji: '🔴', category: 'ألوان', phonetic: '/rɛd/' },
  { id: 'blue', english: 'Blue', arabic: 'أَزْرَق', emoji: '🔵', category: 'ألوان', phonetic: '/bluː/' },
  { id: 'green', english: 'Green', arabic: 'أَخْضَر', emoji: '🟢', category: 'ألوان', phonetic: '/ɡriːn/' },
  { id: 'yellow', english: 'Yellow', arabic: 'أَصْفَر', emoji: '🟡', category: 'ألوان', phonetic: '/ˈjɛloʊ/' },
  { id: 'white', english: 'White', arabic: 'أَبْيَض', emoji: '⚪', category: 'ألوان', phonetic: '/waɪt/' },
  { id: 'black', english: 'Black', arabic: 'أَسْوَد', emoji: '⚫', category: 'ألوان', phonetic: '/blæk/' },
  { id: 'one', english: 'One', arabic: 'وَاحِد', emoji: '1️⃣', category: 'أرقام', phonetic: '/wʌn/' },
  { id: 'two', english: 'Two', arabic: 'اِثْنَان', emoji: '2️⃣', category: 'أرقام', phonetic: '/tuː/' },
  { id: 'three', english: 'Three', arabic: 'ثَلَاثَة', emoji: '3️⃣', category: 'أرقام', phonetic: '/θriː/' },
  { id: 'four', english: 'Four', arabic: 'أَرْبَعَة', emoji: '4️⃣', category: 'أرقام', phonetic: '/fɔːr/' },
  { id: 'five', english: 'Five', arabic: 'خَمْسَة', emoji: '5️⃣', category: 'أرقام', phonetic: '/faɪv/' },
  { id: 'ten', english: 'Ten', arabic: 'عَشَرَة', emoji: '🔟', category: 'أرقام', phonetic: '/tɛn/' },

  // Common Verbs & Actions
  { id: 'read', english: 'Read', arabic: 'يَقْرَأ', emoji: '📖', category: 'أفعال', phonetic: '/riːd/' },
  { id: 'write', english: 'Write', arabic: 'يَكْتُب', emoji: '✍️', category: 'أفعال', phonetic: '/raɪt/' },
  { id: 'eat', english: 'Eat', arabic: 'يَأْكُل', emoji: '🍽️', category: 'أفعال', phonetic: '/iːt/' },
  { id: 'drink', english: 'Drink', arabic: 'يَشْرَب', emoji: '🥤', category: 'أفعال', phonetic: '/drɪŋk/' },
  { id: 'sleep', english: 'Sleep', arabic: 'يَنَام', emoji: '😴', category: 'أفعال', phonetic: '/sliːp/' },
  { id: 'walk', english: 'Walk', arabic: 'يَمْشِي', emoji: '🚶', category: 'أفعال', phonetic: '/wɔːk/' },
  { id: 'run', english: 'Run', arabic: 'يَرْكُض', emoji: '🏃', category: 'أفعال', phonetic: '/rʌn/' },
  { id: 'play', english: 'Play', arabic: 'يَلْعَب', emoji: '⚽', category: 'أفعال', phonetic: '/pleɪ/' },
  { id: 'speak', english: 'Speak', arabic: 'يَتَكَلَّم', emoji: '🗣️', category: 'أفعال', phonetic: '/spiːk/' },
  { id: 'listen', english: 'Listen', arabic: 'يَسْتَمِع', emoji: '👂', category: 'أفعال', phonetic: '/ˈlɪsən/' },
  { id: 'see', english: 'See', arabic: 'يَرَى', emoji: '👀', category: 'أفعال', phonetic: '/siː/' },
  { id: 'study', english: 'Study', arabic: 'يَدْرُس', emoji: '📚', category: 'أفعال', phonetic: '/ˈstʌdi/' },
  { id: 'work', english: 'Work', arabic: 'يَعْمَل', emoji: '💼', category: 'أفعال', phonetic: '/wɜːrk/' },
  { id: 'laugh', english: 'Laugh', arabic: 'يَضْحَك', emoji: '😄', category: 'أفعال', phonetic: '/læf/' },
  { id: 'smile', english: 'Smile', arabic: 'يَبْتَسِم', emoji: '😊', category: 'أفعال', phonetic: '/smaɪl/' },
  { id: 'help', english: 'Help', arabic: 'يُسَاعِد', emoji: '🤝', category: 'أفعال', phonetic: '/hɛlp/' },

  // Adjectives & Feelings
  { id: 'happy', english: 'Happy', arabic: 'سَعِيد', emoji: '😊', category: 'صفات ومشاعر', phonetic: '/ˈhæpi/' },
  { id: 'sad', english: 'Sad', arabic: 'حَزِين', emoji: '😢', category: 'صفات ومشاعر', phonetic: '/sæd/' },
  { id: 'big', english: 'Big', arabic: 'كَبِير', emoji: '🐘', category: 'صفات ومشاعر', phonetic: '/bɪɡ/' },
  { id: 'small', english: 'Small', arabic: 'صَغِير', emoji: '🐜', category: 'صفات ومشاعر', phonetic: '/smɔːl/' },
  { id: 'fast', english: 'Fast', arabic: 'سَرِيع', emoji: '⚡', category: 'صفات ومشاعر', phonetic: '/fæst/' },
  { id: 'slow', english: 'Slow', arabic: 'بَطِيء', emoji: '🐢', category: 'صفات ومشاعر', phonetic: '/sloʊ/' },
  { id: 'hot', english: 'Hot', arabic: 'حَارّ', emoji: '🔥', category: 'صفات ومشاعر', phonetic: '/hɒt/' },
  { id: 'cold', english: 'Cold', arabic: 'بَارِد', emoji: '❄️', category: 'صفات ومشاعر', phonetic: '/koʊld/' },
  { id: 'beautiful', english: 'Beautiful', arabic: 'جَمِيل', emoji: '🌺', category: 'صفات ومشاعر', phonetic: '/ˈbjuːtɪfəl/' },
  { id: 'strong', english: 'Strong', arabic: 'قَوِيّ', emoji: '💪', category: 'صفات ومشاعر', phonetic: '/strɒŋ/' },
  { id: 'easy', english: 'Easy', arabic: 'سَهْل', emoji: '✨', category: 'صفات ومشاعر', phonetic: '/ˈiːzi/' },
  { id: 'clean', english: 'Clean', arabic: 'نَظِيف', emoji: '🧼', category: 'صفات ومشاعر', phonetic: '/kliːn/' },
  { id: 'new', english: 'New', arabic: 'جَدِيد', emoji: '🆕', category: 'صفات ومشاعر', phonetic: '/njuː/' },
  { id: 'old', english: 'Old', arabic: 'قَدِيم', emoji: '📜', category: 'صفات ومشاعر', phonetic: '/oʊld/' },
  { id: 'light', english: 'Light', arabic: 'نُور', emoji: '💡', category: 'طبيعة', phonetic: '/laɪt/' },
  { id: 'night', english: 'Night', arabic: 'لَيْل', emoji: '🌃', category: 'طبيعة', phonetic: '/naɪt/' },
  { id: 'day', english: 'Day', arabic: 'نَهَار', emoji: '🌅', category: 'طبيعة', phonetic: '/deɪ/' },
  { id: 'love', english: 'Love', arabic: 'حُبّ', emoji: '❤️', category: 'مشاعر', phonetic: '/lʌv/' },
  { id: 'peace', english: 'Peace', arabic: 'سَلَام', emoji: '🕊️', category: 'مشاعر', phonetic: '/piːs/' }
];

// Helper to normalize Arabic text (strip diacritics / tashkeel and unify hamzas)
export function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove tashkeel
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim()
    .toLowerCase();
}

// Find word in local dictionary by either English or Arabic
export function findLocalWord(query: string): WordItem | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;

  const normalizedQ = normalizeArabic(q);

  // Exact English match
  let found = VOCABULARY_LIST.find(
    (item) => item.english.toLowerCase() === q
  );
  if (found) return found;

  // Exact Arabic match
  found = VOCABULARY_LIST.find(
    (item) => normalizeArabic(item.arabic) === normalizedQ
  );
  if (found) return found;

  // Starts with match (English)
  found = VOCABULARY_LIST.find((item) =>
    item.english.toLowerCase().startsWith(q)
  );
  if (found) return found;

  // Starts with match (Arabic)
  found = VOCABULARY_LIST.find((item) =>
    normalizeArabic(item.arabic).startsWith(normalizedQ)
  );
  return found;
}

// Search matching suggestions
export function searchSuggestions(query: string, limit = 6): WordItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const normalizedQ = normalizeArabic(q);

  return VOCABULARY_LIST.filter((item) => {
    const eng = item.english.toLowerCase();
    const arb = normalizeArabic(item.arabic);
    return eng.includes(q) || arb.includes(normalizedQ);
  }).slice(0, limit);
}
