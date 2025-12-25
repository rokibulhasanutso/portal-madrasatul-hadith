import React from "react";
import {
  CalendarDays,
  Pencil,
  BookOpen,
  UserCircle2,
} from "lucide-react";

const RoutineModelTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-6 flex justify-center items-start">

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.4)] border border-white/20 p-8">

        {/* Header */}
        <div className="text-center">

          {/* Logo Circle */}
          <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur flex items-center justify-center shadow-lg border border-white/30">
            <UserCircle2 className="w-12 h-12 text-white" />
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-white tracking-wide">
            নূরানী তালিমুল কুরআন বোর্ড  
            <span className="block text-indigo-300">চট্টগ্রাম বাংলাদেশ</span>
          </h1>

          <p className="text-indigo-200 mt-2 text-sm">
            Al Jamiatul Ahlia Darul Uloom Moinul Islam Hathazari, Chittagong.
          </p>

          <p className="text-indigo-200 text-sm">
            কেন্দ্রীয় কার্যালয়: হাটহাজারী, চট্টগ্রাম।
          </p>

          <a className="text-indigo-300 underline text-sm block mt-1">
            www.nooraniboardctg.com
          </a>

          {/* Divider */}
          <div className="mt-6 w-full flex justify-center">
            <div className="w-40 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent rounded-full"></div>
          </div>

          {/* Labels */}
          <div className="mt-6">
            <span className="px-6 py-2 bg-indigo-500 text-white rounded-full text-lg font-bold shadow-md flex items-center gap-2 w-max mx-auto">
              <CalendarDays className="w-5 h-5" />
              বার্ষিক পরীক্ষা - ২০২৫ইং
            </span>

            <div className="mt-3">
              <span className="px-5 py-1 bg-white/20 backdrop-blur text-white rounded-full shadow flex items-center gap-2 w-max mx-auto border border-white/30">
                <Pencil className="w-5 h-5" />
                পরীক্ষার রুটিন
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/20 shadow-xl bg-white/5 backdrop-blur">
          <table className="w-full text-sm text-white/90">
            <thead className="bg-white/10 text-indigo-200 uppercase">
              <tr>
                {["তারিখ", "বার", "প্রেষ", "নার্সারী", "প্রথম শ্রেণি", "দ্বিতীয় শ্রেণি"].map((h, i) => (
                  <th key={i} className="px-4 py-3 border-b border-white/10">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[
                ["০৬/১২/২০২৫", "শনিবার", "আরবি লেখা", "আরবি লেখা", "কিরাআত-তাজবিদ ও নমুনা...", "আরবি লেখা"],
                ["০৭/১২/২০২৫", "রবিবার", "বাংলা", "বাংলা", "বাংলা, মাশক...", "বাংলা"],
                ["০৮/১২/২০২৫", "সোমবার", "গণিত", "গণিত", "*", "গণিত"],
                ["০৯/১২/২০২৫", "মঙ্গলবার", "ইংরেজি", "ইংরেজি", "*", "ইংরেজি"],
                ["১০/১২/২০২৫", "বুধবার", "কালিমা ও মাসায়েল", "কালিমা ও মাসায়েল", "*", "পরিবেশ পরিচিতি..."],
                ["১১/১২/২০২৫", "বৃহস্পতিবার", "হাদিস-শিক্ষা (মৌখিক)", "হাদিস শিক্ষা", "*", "*"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white/5" : "bg-white/0"}
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 border-b border-white/10">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="mt-10 bg-white/10 border border-white/20 p-6 rounded-2xl shadow-inner backdrop-blur text-white/90 text-sm leading-relaxed">
          <div className="flex items-center gap-2 mb-2 font-semibold text-indigo-200">
            <BookOpen className="w-5 h-5" />
            পরীক্ষার্থীদের জন্য নির্দেশাবলী:
          </div>

          <p>★ লিখিত পরীক্ষা সকাল <b>৯:৩০ মিনিট</b> এবং মৌখিক পরীক্ষা বিকাল <b>২:০০ ঘটিকা</b> শুরু হবে।</p>
          <p>★ পরীক্ষার পূর্বে <b>৩০ মিনিট আগে</b> কেন্দ্রে উপস্থিত হতে হবে।</p>
          <p>★ মোবাইল, ঘড়ি, ব্যাগ, নোটস আনা সম্পূর্ণ নিষিদ্ধ।</p>
          <p>★ বহিরাগত সহযোগিতা দেওয়া–নেওয়া সম্পূর্ণ নিষিদ্ধ।</p>
          <p>★ পরীক্ষা শেষে প্রশ্নপত্র ঘরে নেওয়া যাবে না।</p>
        </div>

        {/* Footer */}
        <div className="text-right mt-10 text-indigo-200 font-semibold">
          <p>নির্দেশক:</p>
          <p>পরীক্ষা নিয়ন্ত্রক</p>
          <p>নূরানী তালিমুল কুরআন বোর্ড চট্টগ্রাম বাংলাদেশ</p>
        </div>
      </div>
    </div>
  );
};

export default RoutineModelTest;
