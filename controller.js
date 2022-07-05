const { flat_balance_computation, percentage_balance_computation, ratio_balance_computation } = require("./utils");


const calculate_split = async (req, res) => {
  const { ID, Amount, Currency, CustomerEmail, SplitInfo } = req.body;
  let balance = Amount;

  let flat_list = await SplitInfo.filter(obj => obj.SplitType === "FLAT");
  let percentage_list = await SplitInfo.filter(obj => obj.SplitType === "PERCENTAGE");
  let ratio_list = await SplitInfo.filter(obj => obj.SplitType === "RATIO");

  let payload = { ID, "Balance": balance, "SplitBreakdown": [] };

  console.log(`Initial Balance:\n${balance}\n`);

  console.log(`FLAT TYPES FIRST`);
  for (let flat_obj of flat_list) {
    balance = await flat_balance_computation(balance, flat_obj.SplitEntityId, flat_obj.SplitValue);
    payload["Balance"] = balance;
    payload["SplitBreakdown"].push({ "SplitEntityId": flat_obj.SplitEntityId, "Amount": flat_obj.SplitValue });;
  };

  console.log(`PERCENTAGE TYPES COME NEXT`);
  for (let percent_obj of percentage_list) {
    let percent_values = await percentage_balance_computation(balance, percent_obj.SplitEntityId, percent_obj.SplitValue);
    balance = percent_values.percent_balance;
    payload["Balance"] = balance;
    payload["SplitBreakdown"].push({ "SplitEntityId": percent_obj.SplitEntityId, "Amount": percent_values.split_amount })
  };

  console.log(`FINALLY, RATIO TYPES`);
  let ratio_sum = 0;
  let ratio_vals = [];
  for (let obj of ratio_list) {
    ratio_sum = ratio_sum + obj.SplitValue;
    ratio_vals.push(obj.SplitValue);
  };

  let text = ratio_vals.join(" + ");
  console.log(`TOTAL RATIO = ${text} = ${ratio_sum}`);
  console.log(`Opening Ratio Balance = ${balance}\n`);
  let start_balance = balance;

  for (let ratio_obj of ratio_list) {
    let ratio_values = await ratio_balance_computation(balance, start_balance, ratio_obj.SplitEntityId, ratio_obj.SplitValue, ratio_sum);
    balance = ratio_values.ratio_balance;
    payload["Balance"] = balance;
    payload["SplitBreakdown"].push({ "SplitEntityId": ratio_obj.SplitEntityId, "Amount": ratio_values.split_amount });
  };

  console.log(`\nFinal Balance: ${balance}`);
  res.status(200).json(payload);
};

module.exports = { calculate_split };