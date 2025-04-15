const fs = require('fs');
const superagent = require('superagent');

/////////////--- Creating Promises
/// ReadFile promise
const readfilepro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) return reject('Error while reading the file');
      resolve(data);
    });
  });
};

////// Wrting File promise
const writefilepro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) return reject('Error Occurs');
      resolve('success');
    });
  });
};

const getdogpic = async () => {
  try {
    const data = await readfilepro(`${__dirname}/dog.txt`);
    console.log('Breed :- ', data);

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writefilepro('dog-img.txt', imgs.join('\n'));
    console.log('random dog image saved ');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return 'string to be return';
};

(async () => {
  try {
    console.log('string to be retunn');
    const x = await getdogpic();
    console.log('2:second');
  } catch (err) {
    console.log('Error 💥');
  }
})();

/*
console.log('1: First ');
getdogpic()
  .then((x) => {
    console.log('string to be retunn');
    console.log('2:second');
  })
  .catch((err) => {
    console.log('Error 💥');
  });
*/

/*
readfilepro(`${__dirname}/dog.txt`)
  .then((result) => {
    console.log('Breed :- ', result);
    return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writefilepro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('random images');
  })
  .catch((err) => {
    console.log(err);
  });
*/
