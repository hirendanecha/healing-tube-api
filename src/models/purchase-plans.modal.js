require("../common/common")();
const environment = require("../environments/environment");
const { executeQuery } = require("../helpers/utils");

var purchasePlans = function (plan) {
  this.profileId = plan.profileId;
  this.practitionerId = plan.practitionerId;
  this.selectedPlan = plan.selectedPlan;
  this.addOn = plan.addOn;
  this.startDate = plan.startDate;
  this.endDate = plan.endDate;
  this.leftMin = plan.leftMin;
  this.useMin = plan.useMin;
  this.amount = plan.amount;
};

purchasePlans.getMyPlans = async (id) => {
  try {
    const query = "select * from purchase_plans where profileId = ?";
    const values = [id];
    const plans = await executeQuery(query, values);
    if (plans) {
      return plans;
    }
  } catch (error) {
    return error;
  }
};

purchasePlans.create = async (data) => {
  try {
    const query = "Insert into purchase_plans set ?";
    const values = [data];
    const plans = await executeQuery(query, values);
    if (plans) {
      return plans.insertId;  
    }
  } catch (error) {
    return error;
  }
};

module.exports = purchasePlans;
