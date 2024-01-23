const form = document.querySelector('.form');

const onFormSubmit = e => {
  e.preventDefault();
  const { delay, step, amount } = e.target.elements;
  let interval = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, interval)
      .then(({ position, delay }) =>
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        console.log(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    interval += Number(step.value);
  }
};

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};
form.addEventListener('submit', onFormSubmit);

// const fetchUserFromServer = username => {
//   return new Promise((resolve, reject) => {
//     console.log(`Fetching data for ${username}`);

//     setTimeout(() => {
//       // Change value of isSuccess variable to simulate request status
//       const isSuccess = true;

//       if (isSuccess) {
//         resolve(username);
//       } else {
//         reject('error');
//       }
//     }, 2000);
//   });
// };

// fetchUserFromServer('Mango')
//   .then(user => console.log(user))
//   .catch(error => console.log(error));

// const makePromise = (text, delay) => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(text), delay);
//   });
// };
// const promiseA = makePromise('promiseA value', 10000);
// const promiseB = makePromise('promiseB value', 3000);

// Promise.race([promiseA, promiseB])
//   .then(value => console.log(value))
//   .catch(error => console.log(error));

// const makeGreeting = name => {
//   if (name === '' || name === undefined) {
//     return Promise.reject('User have to have a name!');
//   }
//   return Promise.resolve(`Welcome, ${name}`);
// };

// makeGreeting('')
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
