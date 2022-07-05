const output_progress = async (balance, splitEntityId, splitValue) => {
    console.log(`Split amount for "${splitEntityId}": ${splitValue}`);
    console.log(`Balance after split calculation for "${splitEntityId}": (${balance} - ${splitValue})`);
    console.log(`${balance}\n`);
};

const flat_balance_computation = async (initial_bal, splitEntityId, splitValue) => {
    let flat_balance = initial_bal - splitValue;
    output_progress(flat_balance, splitEntityId, splitValue);

    return flat_balance;
};

const percentage_balance_computation = async (initial_bal, splitEntityId, splitValue) => {
    let split_amount = (splitValue / 100) * initial_bal;
    split_amount = Math.round((split_amount + Number.EPSILON) * 100) / 100
    let percent_balance = initial_bal - split_amount;

    console.log(`Split amount for "${splitEntityId}": (${splitValue} % OF ${initial_bal}) = ${split_amount}`);
    console.log(`Balance after split calculation for "${splitEntityId}": (${initial_bal} - ${split_amount})`);
    console.log(`${percent_balance}\n`);

    return { percent_balance, split_amount };
};

const ratio_balance_computation = async (initial_bal, start_balance, splitEntityId, splitValue, ratio_sum) => {
    let split_amount  = (splitValue / ratio_sum) * start_balance;
    split_amount = Math.round((split_amount + Number.EPSILON) * 100) / 100;
    let ratio_balance = initial_bal - split_amount;
    ratio_balance = Math.round((ratio_balance + Number.EPSILON) * 100) / 100;

    console.log(`Split amount for "${splitEntityId}": ((${splitValue}/${ratio_sum}) * ${start_balance}) = ${split_amount}`);
    console.log(`Balance after split calculation for "${splitEntityId}": (${start_balance} - (${split_amount}))`);
    console.log(`${ratio_balance}\n`);

    return { ratio_balance, split_amount };
};

module.exports = { flat_balance_computation, percentage_balance_computation, ratio_balance_computation };