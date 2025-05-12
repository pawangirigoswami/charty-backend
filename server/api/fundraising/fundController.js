const Fund = require("./fundModel");

const addFund = async (req, res) => {
  try {
    const { tittle, description, startDate, endDate, amount } = req.body;
    const validation = [];

    if (!tittle) validation.push("tittle is required");
    if (!description) validation.push("description is required");
    if (!startDate) validation.push("startDate is required");
    if (!endDate) validation.push("endDate is required");
    if (!amount) validation.push("amount is required");

    if (validation.length > 0) {
      return res.json({
        status: 400,
        success: false,
        message: "validation error",
        error: validation
      });
    }

    const fund = new Fund({ tittle, description, startDate, endDate, amount });
    const saved = await fund.save();

    res.json({
      status: 201,
      success: true,
      message: "new fund is created successfully",
      data: saved
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "internal server error",
      error: err.message
    });
  }
};

const getAllFund = async (req, res) => {
  try {
    const fund = await Fund.find().populate("userId", "name");
    res.json({
      status: 200,
      success: true,
      message: "all funds fetched successfully",
      data: fund
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "internal server error",
      error: err.message
    });
  }
};

const getFundById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ status: 400, success: false, message: "id is required" });
    }

    const fund = await Fund.findById(id);
    if (!fund) {
      return res.json({ status: 404, success: false, message: "fund not found" });
    }

    res.json({ status: 200, success: true, data: fund });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "internal server error",
      error: err.message
    });
  }
};

const updatefFundById = async (req, res) => {
  try {
    const { id, userId, donationAmount, ...data } = req.body;

    if (!id) {
      return res.json({ status: 400, success: false, message: "id is required" });
    }

    const fund = await Fund.findById(id);
    if (!fund) {
      return res.json({ status: 404, success: false, message: "fund not found" });
    }

    // Donation logic
    if (donationAmount && userId) {
      const amount = Number(donationAmount);
      if (isNaN(amount) || amount <= 0) {
        return res.json({
          status: 400,
          success: false,
          message: "Invalid donation amount"
        });
      }

      fund.collectedAmount = (fund.collectedAmount || 0) + amount;
      fund.donors.push({ userId, donationAmount: amount });
      await fund.save();

      return res.json({
        status: 200,
        success: true,
        message: "Donation successful",
        data: fund
      });
    }

    // General update
    const updatedFund = await Fund.findByIdAndUpdate(id, data, { new: true });
    res.json({
      status: 200,
      success: true,
      message: "Fund updated successfully",
      data: updatedFund
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "internal server error",
      error: err.message
    });
  }
};

const deleteFund = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ status: 400, success: false, message: "id is required" });
    }

    const deleted = await Fund.findByIdAndDelete(id);
    if (!deleted) {
      return res.json({ status: 404, success: false, message: "fund not found" });
    }

    res.json({
      status: 200,
      success: true,
      message: "Fund deleted successfully"
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "internal server error",
      error: err.message
    });
  }
};

module.exports = {
  addFund,
  getAllFund,
  getFundById,
  updatefFundById,
  deleteFund
};
