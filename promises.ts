enum PromiseStatusENUM {
  RESOLVE = "RESOLVE",
  REJECT = "REJECT",
}

type PromisesStatusType = PromiseStatusENUM.RESOLVE | PromiseStatusENUM.REJECT;

function isValidPromiseStatus(status: any): status is PromisesStatusType {
  return Object.values(PromiseStatusENUM).some(
    (promiseStatus) => promiseStatus === status
  );
}

interface CreatePromiseInputDTO {
  action: string;
  time: number;
  name: string;
}

const createPromise = ({
  action,
  name,
  time,
}: CreatePromiseInputDTO): Promise<string> | never =>
  new Promise((resolve, reject) => {
    if (!isValidPromiseStatus(action)) {
      throw new Error(`Action: ${action} is not a valid action type.`);
    }

    if (action === PromiseStatusENUM.RESOLVE) {
      setTimeout(() => resolve(`Promise ${name} was resolved`), time);
    } else {
      setTimeout(() => reject(`Promise ${name} was rejected`), time);
    }
  });

async function resolveMultiplePromises(): Promise<void> | never {
  const firstPromise = createPromise({
    action: PromiseStatusENUM.RESOLVE,
    name: "One",
    time: 1000,
  });
  const secondPromise = createPromise({
    action: PromiseStatusENUM.RESOLVE,
    name: "Two",
    time: 2000,
  });
  const thirdPromise = createPromise({
    action: PromiseStatusENUM.RESOLVE,
    name: "Three",
    time: 3000,
  });

  try {
    const [promise1, promise2, promise3] = await Promise.all([
      firstPromise,
      secondPromise,
      thirdPromise,
    ]);
    console.log(promise1, promise2, promise3);
  } catch (error) {
    console.log("error", error);
    throw new Error(`Error: ${error}`);
  }
}

resolveMultiplePromises();
