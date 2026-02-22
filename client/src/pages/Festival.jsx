import React from "react";

export const Festival = () => {
  const handleOpenPD = () => {
    const pdfpath = "/pooram.pdf";
    window.open(pdfpath, "_blank");
  };

  const scheduleData = [
    {
      date: "15–11–2025",
      title: "പാട്ടുഘോഷം",
      events: [
        { time: "രാവിലെ 9.00 ന്", details: "ഉച്ചപ്പാട്ട്" },
        { time: "വൈകുന്നേരം 6.30 ന്", details: "ദീപാരാധന" },
        {
          time: "തുടര്‍ന്ന്",
          details: "സന്ധ്യ വേല, തായമ്പക, കേളി, കൊമ്പ്പ്പറ്റ്, കുഴൽപറ്റ്",
        },
        {
          time: "രാത്രി 8:30 ന്",
          details: "കളംപൂജ, കളം പാട്ട്, ഈടു കൂറും ചവിട്ടൽ, ചുറ്റുതാലപ്പൊലി",
        },
      ],
    },
    {
      date: "16–11–2025",
      title: "താലപ്പൊലി മഹോത്സവം",
      events: [
        { time: "വൈകുന്നേരം 3.30 ന്", details: "ഉച്ചപ്പാട്ട്" },
        {
          time: "4.30 ന്",
          details:
            "പുറത്തേക്ക് എഴുന്നള്ളിപ്പ്, പൂതൻ കളി, താലം നിരത്തൽ, പാണ്ടിമേളം, ഗജവീരന്മാരുടെ അകമ്പടിയോടുകൂടി എഴുന്നള്ളിപ്പും തിരിച്ചെഴുന്നള്ളിപ്പും",
        },
        { time: "രാത്രി 8.30 ന്", details: "കളം പാട്ട്" },
        { time: "രാത്രി 9.30 ന് ശേഷം", details: "കുറ വലിച്ച് സമാപനം" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <img
            src="/img3.jpg"
            alt="Temple Logo"
            className="w-full max-w-lg h-auto object-contain"
          />
          <div className="w-full md:w-auto bg-[#7b3f00] text-center text-yellow-400 px-6 py-4 rounded-lg shadow-md">
            <p className="text-sm md:text-base mb-1">
              2025 നവംബർ 15 മുതൽ 16 വരെ <br />
              <span className="text-[13px] text-yellow-200">
                (1201 കുംഭം 15 മുതൽ 16 വരെ)
              </span>
            </p>
            <h3 className="text-xl md:text-xl font-bold mt-1">16 11 2025</h3>
          </div>
        </div>

        <div className="text-left mb-8">
          <h1 className="text-2xl font-semibold text-[#b36b00]">ഉത്സവങ്ങൾ</h1>
          <div className="w-24 h-0.5 bg-[#d4a156] mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {scheduleData.map((day, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="w-full text-center my-6 py-6 px-4 bg-yellow-50 rounded-2xl shadow-lg">
                <h2 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
                  {day.date.includes("15") ? "നവംബർ 15 ശനി" : "നവംബർ 16 ഞായർ"}
                </h2>
                <h3 className="text-2xl font-semibold text-[#8b4513] mt-2">
                  {day.title}
                </h3>
                <div className="w-32 h-1 bg-linear-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="bg-[#f7f3eb] shadow-xl rounded-xl w-full grow relative mt-4 flex flex-col">
                <div className="absolute -top-5 left-0 bg-[#8b4513] text-white px-5 py-1 rounded-r-2xl text-sm font-semibold">
                  {day.date}
                </div>
                <div className="p-6 pt-10 text-center grow flex flex-col justify-center space-y-5">
                  {day.events.map((event, i) => (
                    <div key={i}>
                      <p className="text-red-700 font-semibold text-sm mb-1">
                        {event.time}
                      </p>
                      <p className="text-gray-800 font-medium">
                        {event.details}
                      </p>
                      {i < day.events.length - 1 && (
                        <hr className="border-t border-gray-300 mt-3" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10 mb-12">
          <button
            onClick={handleOpenPD}
            className="bg-[#a0521c] hover:bg-[#8b4513] text-white font-semibold px-6 py-2 rounded-lg shadow-md transition w-full md:w-auto"
          >
            കൂടുതൽ വിവരങ്ങൾക്ക്
          </button>
        </div>

        <div className="bg-linear-to-r from-amber-100 to-yellow-100 rounded-2xl shadow-lg p-6 border-l-4 border-amber-500 mt-10">
          <h3 className="text-lg font-bold text-amber-900 mb-2">
            ശ്രദ്ധിക്കുക
          </h3>
          <p className="text-amber-800 leading-relaxed">
            ഉത്സവ തീയതികൾ വർഷംതോറും വ്യത്യാസപ്പെടാം. തീയതികളും സമയങ്ങളും ക്ഷേത്ര
            ഓഫീസ് വഴിയാണ് അറിയിക്കപ്പെടുന്നത്.
          </p>
        </div>

        <div className="text-center mt-12 py-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-linear-to-r from-transparent to-orange-400"></div>
            <span className="text-3xl">🙏</span>
            <div className="w-12 h-1 bg-linear-to-l from-transparent to-orange-400"></div>
          </div>
          <img
            src="/Bhagawathy.jpg"
            alt="Bhagawathy"
            className="mx-auto w-16 h-16 mb-3 rounded-full object-cover shadow-lg border-2 border-amber-400"
          />
          <p className="text-gray-600 font-medium">അമ്മേ നാരായണ ദേവീ നാരായണ</p>
        </div>
      </div>
    </div>
  );
};

export default Festival;
