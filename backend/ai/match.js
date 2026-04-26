function generateMatches(students) {
  let matches = [];

  for (let i = 0; i < students.length; i++) {
    for (let j = i + 1; j < students.length; j++) {
      let score = 0;

      if (students[i].diet === students[j].diet) score++;
      if (students[i].sleep === students[j].sleep) score++;
      if (students[i].cleanliness === students[j].cleanliness) score++;
      if (students[i].study === students[j].study) score++;
      if (students[i].noise === students[j].noise) score++;

      matches.push({
        student1: students[i].regNo,
        student2: students[j].regNo,
        score
      });
    }
  }

  // sort
  matches.sort((a, b) => b.score - a.score);

  // unique pairing
  let used = new Set();
  let finalMatches = [];

  for (let m of matches) {
    if (!used.has(m.student1) && !used.has(m.student2)) {
      finalMatches.push(m);
      used.add(m.student1);
      used.add(m.student2);
    }
  }

  return finalMatches;
}

module.exports = generateMatches;