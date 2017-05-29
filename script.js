function log(msg) {
  console.log(msg);
}

function identity(arg) {
  return arg;
}

function add(first, second) {
  return first + second;
}

function sub(first, second) {
  return first - second;
}

function mul(first, second) {
  return first * second;
}

function identityf(arg) {
  return () => {
    return arg;
  };
}

function addf(arg1) {
  return (arg2) => {
    return add(arg1, arg2);
  };
}

function liftf(func) {
  return (arg1) => {
    return (arg2) => {
      return func(arg1, arg2);
    };
  };
}

function curry(func, arg) {
  return liftf(func)(arg);
}

function twice(binaryFunc) {
  return (num) => {
    return binaryFunc(num, num);
  };
}

const inc = curry(add, 1);

const doubl = twice(add);

function reverse(binaryFunc) {
  return (arg1, arg2) => {
    return binaryFunc(arg2, arg1);
  };
}

const bus = reverse(sub);

function compuseu(f, g) {
  return (a) => {
    return g(f(a));
  };
}

function composeb(binaryFunc1, binaryFunc2) {
  return (...args) => {
    return binaryFunc2(binaryFunc1(args[0], args[1]), args[2]);
  };
}

function limit(func, max) {
  let usesLeft = max;

  return (...args) => {

    if (usesLeft > 0) {
      usesLeft -= 1;

      return func(args[0], args[1]);
    }

    return null;
  };
}

function from(startValue) {
  let value = startValue;

  return () => {
    const oldValue = value;

    value += 1;

    return oldValue;
  };
}

function to(generator, endValue) {
  const end = endValue;

  return () => {
    const ix = generator();

    if (ix < end) {
      return ix;
    }

    return null;
  };
}

function fromTo(start, end) {
  return to(from(start), end);
}

const index = fromTo(2, 4);

log(index());
log(index());
log(index());
log(index());
log(index());

