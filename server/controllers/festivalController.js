const fs = require("fs");
const path = require("path");
const Festival = require("../models/Festival");

const createDefaultFestivalData = () => ({
  title: "",
  datesInfo: "",
  malayalamDates: "",
  highlightDate: "",
  pdfUrl: "",
  scheduleData: [],
});

const uploadsRoot = path.join(__dirname, "..", "uploads");

const buildFileUrl = (relativePath) => relativePath.replace(/\\/g, "/");

const deleteUploadedPdf = (pdfUrl) => {
  if (!pdfUrl) {
    return;
  }

  let pathname = pdfUrl;

  try {
    pathname = new URL(pdfUrl).pathname;
  } catch (error) {
    pathname = pdfUrl;
  }

  const normalizedPathname = pathname.replace(/\\/g, "/");
  const expectedPrefix = "/uploads/festival-pdfs/";

  if (!normalizedPathname.startsWith(expectedPrefix)) {
    return;
  }

  const relativeFilePath = normalizedPathname.replace("/uploads/", "");
  const filePath = path.join(uploadsRoot, relativeFilePath);
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(path.resolve(uploadsRoot))) {
    return;
  }

  if (fs.existsSync(resolvedPath)) {
    fs.unlinkSync(resolvedPath);
  }
};

const getFestivalData = async (req, res) => {
  try {
    const data = await Festival.findOne();
    res.status(200).json(data || createDefaultFestivalData());
  } catch (error) {
    res.status(500).json({ message: "Could not fetch data.", error });
  }
};

const uploadFestivalPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a PDF file." });
    }

    const existingData = await Festival.findOne();

    if (existingData?.pdfUrl) {
      deleteUploadedPdf(existingData.pdfUrl);
    }

    const pdfUrl = buildFileUrl(`/uploads/festival-pdfs/${req.file.filename}`);

    const updatedData = await Festival.findOneAndUpdate(
      {},
      { pdfUrl },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    return res.status(200).json({
      message: "PDF uploaded successfully.",
      pdfUrl,
      updatedData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Could not upload PDF.", error });
  }
};

const updateFestivalData = async (req, res) => {
  try {
    const { title, datesInfo, malayalamDates, highlightDate, pdfUrl, scheduleData } = req.body;


    const updatedData = await Festival.findOneAndUpdate(
      {}, 
      { title, datesInfo, malayalamDates, highlightDate, pdfUrl, scheduleData },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Successfully saved", updatedData });
  } catch (error) {
    res.status(500).json({ message: "Could not save.", error });
  }
};

module.exports = { getFestivalData, uploadFestivalPdf, updateFestivalData };
