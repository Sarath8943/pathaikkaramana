import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const resolvePdfUrl = (pdfUrl) => {
  if (!pdfUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(pdfUrl)) {
    return pdfUrl;
  }

  const apiBaseUrl = axiosInstance.defaults.baseURL || "";
  const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "");

  if (!apiOrigin) {
    return pdfUrl;
  }

  return new URL(pdfUrl, `${apiOrigin}/`).toString();
};

const Festival = () => {
  const [datesInfo, setDatesInfo] = useState("");
  const [malayalamDates, setMalayalamDates] = useState("");
  const [highlightDate, setHighlightDate] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [scheduleData, setScheduleData] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [selectedPdfName, setSelectedPdfName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/festival");
        const data = response.data;

        if (data) {
          setDatesInfo(data.datesInfo || "2025 നവംബർ 15 മുതൽ 16 വരെ");
          setMalayalamDates(
            data.malayalamDates || "(1201 കുംഭം 15 മുതൽ 16 വരെ)",
          );
          setHighlightDate(data.highlightDate || "16 11 2025");
          setPdfUrl(data.pdfUrl || "");
          setScheduleData(data.scheduleData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveToDatabase = async () => {
    setIsSaving(true);

    const payload = {
      title: "ഉത്സവങ്ങൾ",
      datesInfo,
      malayalamDates,
      highlightDate,
      pdfUrl,
      scheduleData,
    };

    try {
      await axiosInstance.put("/festival/update", payload);
      setIsAdmin(false);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedPdfName(file.name);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setIsUploadingPdf(true);
      const response = await axiosInstance.post("/festival/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPdfUrl(response.data.pdfUrl || "");
      setSelectedPdfName("");
      event.target.value = "";
    } catch (error) {
      console.error("Error uploading PDF:", error);
    } finally {
      setIsUploadingPdf(false);
    }
  };

  const addDayCard = () => {
    const newDay = {
      date: "DD-MM-YYYY",
      title: "പുതിയ തലക്കെട്ട്",
      events: [{ time: "സമയം", details: "വിവരങ്ങൾ" }],
    };

    setScheduleData([...scheduleData, newDay]);
  };

  const removeDayCard = (index) => {
    setScheduleData(scheduleData.filter((_, i) => i !== index));
  };

  const addEvent = (dayIndex) => {
    const newData = [...scheduleData];
    newData[dayIndex].events.push({ time: "സമയം", details: "വിവരങ്ങൾ" });
    setScheduleData(newData);
  };

  const removeEvent = (dayIndex, eventIndex) => {
    const newData = [...scheduleData];
    newData[dayIndex].events = newData[dayIndex].events.filter(
      (_, i) => i !== eventIndex,
    );
    setScheduleData(newData);
  };

  const updateEvent = (dayIndex, eventIndex, field, value) => {
    const newData = [...scheduleData];
    newData[dayIndex].events[eventIndex][field] = value;
    setScheduleData(newData);
  };

  const currentPdfLabel = pdfUrl
    ? decodeURIComponent(pdfUrl.split("/").pop()?.split("?")[0] || "festival.pdf")
    : "PDF ഇല്ല";
  const resolvedPdfUrl = resolvePdfUrl(pdfUrl);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto mb-8 flex max-w-6xl flex-col gap-4 rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-inner sm:p-6 lg:mb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-700"> Festival</h2>
          <div className="flex flex-wrap gap-3">
            {isAdmin && (
              <button
                onClick={saveToDatabase}
                disabled={isSaving || isUploadingPdf}
                className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-700 disabled:bg-green-400"
              >
                {isSaving ? "Saving..." : "update"}
              </button>
            )}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isAdmin
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {isAdmin ? "View Mode" : "Edit"}
            </button>
          </div>
        </div>

        {isAdmin && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800">1. മുകളിലെ വിവരങ്ങൾ</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <input
                type="text"
                value={datesInfo}
                onChange={(e) => setDatesInfo(e.target.value)}
                className="border p-2 rounded"
                placeholder="തീയതി വിവരങ്ങൾ"
              />
              <input
                type="text"
                value={malayalamDates}
                onChange={(e) => setMalayalamDates(e.target.value)}
                className="border p-2 rounded"
                placeholder="മലയാളം തീയതി"
              />
              <input
                type="text"
                value={highlightDate}
                onChange={(e) => setHighlightDate(e.target.value)}
                className="border p-2 rounded"
                placeholder="പ്രധാന തീയതി"
              />
            </div>

            <h3 className="font-semibold text-gray-800 mt-6 pt-4 border-t border-gray-200">
              2. PDF & കാർഡുകൾ
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border rounded-lg bg-white p-4 space-y-3">
                <p className="text-sm font-medium text-gray-700">
                  ഇപ്പോഴുള്ള PDF:
                  <span className="ml-2 text-[#8b4513] break-all">
                    {currentPdfLabel}
                  </span>
                </p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  disabled={isUploadingPdf}
                  className="block w-full text-sm border rounded p-2"
                />
                <p className="text-xs text-gray-500">
                  പുതിയ PDF അപ്ലോഡ് ചെയ്താൽ പഴയ PDF automatically replace ചെയ്യും.
                </p>
                {selectedPdfName && (
                  <p className="text-xs text-amber-700">
                    തിരഞ്ഞെടുക്കിയത്: {selectedPdfName}
                  </p>
                )}
                {pdfUrl && (
                  <button
                    type="button"
                    onClick={() => window.open(resolvedPdfUrl, "_blank")}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Current PDF തുറക്കുക
                  </button>
                )}
                {isUploadingPdf && (
                  <p className="text-xs text-green-700">PDF അപ്ലോഡ് ചെയ്യുന്നു...</p>
                )}
              </div>
              <button
                onClick={addDayCard}
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-medium text-white hover:bg-orange-600 md:py-2"
              >
                പുതിയ കാർഡ് ചേർക്കുക
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center justify-center gap-6 md:mb-12 md:flex-row">
          <div className="w-full rounded-lg bg-[#7b3f00] px-4 py-5 text-center text-yellow-400 shadow-md sm:px-8 sm:py-6 md:w-auto md:px-10">
            <p className="text-sm md:text-base mb-1">
              {datesInfo}
              <br />
              <span className="text-[13px] text-yellow-200">{malayalamDates}</span>
            </p>
            <h3 className="mt-1 text-xl font-bold sm:text-2xl">{highlightDate}</h3>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-left">
            <h1 className="text-2xl font-semibold text-[#b36b00]">ഉത്സവങ്ങൾ</h1>
            <div className="w-24 h-0.5 bg-[#d4a156] mt-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:gap-8">
          {scheduleData.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4 lg:rounded-3xl"
            >
              {isAdmin && (
                <button
                  onClick={() => removeDayCard(dayIndex)}
                  className="absolute -top-3 -right-3 bg-red-600 text-white w-8 h-8 rounded-full shadow-lg z-10 font-bold hover:scale-110"
                >
                  ×
                </button>
              )}

              <div className="my-5 w-full rounded-2xl border border-yellow-100 bg-yellow-50 px-3 py-5 text-center shadow-lg sm:my-6 sm:px-4 sm:py-6">
                {isAdmin ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => {
                        const newData = [...scheduleData];
                        newData[dayIndex].title = e.target.value;
                        setScheduleData(newData);
                      }}
                      className="text-xl font-semibold text-[#8b4513] text-center w-full border-b bg-transparent outline-none"
                      placeholder="Card Title"
                    />
                  </div>
                ) : (
                  <h3 className="mt-1 break-words text-lg font-semibold text-[#8b4513] sm:text-xl">
                    {day.title}
                  </h3>
                )}
              </div>

              <div className="relative mt-4 flex w-full grow flex-col rounded-xl border border-[#e5dfd4] bg-[#f7f3eb] p-4 pt-10 shadow-xl sm:p-6 sm:pt-10">
                {isAdmin ? (
                  <input
                    type="text"
                    value={day.date}
                    onChange={(e) => {
                      const newData = [...scheduleData];
                      newData[dayIndex].date = e.target.value;
                      setScheduleData(newData);
                    }}
                    className="absolute -top-5 left-0 w-32 rounded-r-2xl border-none bg-[#8b4513] px-5 py-1 text-sm font-semibold text-white outline-none"
                  />
                ) : (
                  <div className="absolute -top-5 left-0 rounded-r-2xl bg-[#8b4513] px-5 py-1 text-sm font-semibold text-white">
                    {day.date}
                  </div>
                )}

                <div className="space-y-5">
                  {day.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="relative group">
                      {isAdmin ? (
                        <div className="flex flex-col gap-1.5 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                          <div className="flex justify-between items-center">
                            <input
                              type="text"
                              value={event.time}
                              onChange={(e) =>
                                updateEvent(dayIndex, eventIndex, "time", e.target.value)
                              }
                              className="text-red-700 font-bold text-sm border-b outline-none w-full"
                            />
                            <button
                              onClick={() => removeEvent(dayIndex, eventIndex)}
                              className="ml-2 text-red-500 text-xs font-bold"
                            >
                              ×
                            </button>
                          </div>
                          <textarea
                            value={event.details}
                            onChange={(e) =>
                              updateEvent(
                                dayIndex,
                                eventIndex,
                                "details",
                                e.target.value,
                              )
                            }
                            className="text-gray-800 text-sm border-b outline-none h-16 resize-none w-full"
                          />
                        </div>
                      ) : (
                        <>
                          <p className="mb-1 text-sm font-semibold text-red-700">
                            {event.time}
                          </p>
                          <p className="break-words text-sm font-medium text-gray-800">
                            {event.details}
                          </p>
                        </>
                      )}
                      {eventIndex < day.events.length - 1 && (
                        <hr className="border-t border-gray-300 mt-3" />
                      )}
                    </div>
                  ))}
                </div>

                {isAdmin && (
                  <button
                    onClick={() => addEvent(dayIndex)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs mt-6 self-start"
                  >
                    + ഇവന്റ് ചേർക്കുക
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Festival;
