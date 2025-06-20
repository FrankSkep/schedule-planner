import { t as ensure_array_like, q as escape_html, u as attr_class, v as clsx, w as attr_style, x as stringify, y as bind_props, l as pop, p as push, z as fallback, A as attr } from "../../chunks/index.js";
import "html-to-image";
function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
let colorMap = {};
function getColorForSubject(name) {
  if (colorMap[name]) return colorMap[name];
  const hue = Math.floor(Math.random() * 360);
  const pastel = `hsl(${hue}, 70%, 85%)`;
  colorMap[name] = pastel;
  return pastel;
}
function ScheduleTable($$payload, $$props) {
  push();
  let minHour, maxHour, hours;
  let subjects = $$props["subjects"];
  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];
  function getHourRange(subjects2) {
    if (!subjects2.length) return ["07:00", "23:00"];
    const allTimes = subjects2.flatMap((s) => [s.startTime, s.endTime]);
    const min = allTimes.reduce((a, b) => timeToMinutes(a) < timeToMinutes(b) ? a : b);
    const max = allTimes.reduce((a, b) => timeToMinutes(a) > timeToMinutes(b) ? a : b);
    return [min, max];
  }
  [minHour, maxHour] = getHourRange(subjects);
  hours = (() => {
    const start = timeToMinutes(minHour);
    const end = timeToMinutes(maxHour);
    const arr = [];
    for (let t = start; t < end; t += 60) {
      const h = Math.floor(t / 60).toString().padStart(2, "0");
      arr.push(`${h}:00`);
    }
    return arr;
  })();
  const each_array = ensure_array_like(days);
  const each_array_1 = ensure_array_like(hours);
  $$payload.out += `<div class="overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg"><table class="w-full min-w-[900px] table-fixed border-collapse text-center text-sm"><thead class="sticky top-0 z-10 bg-gradient-to-r from-blue-100 to-blue-200 font-semibold text-gray-700 shadow"><tr><th class="w-32 border-b px-2 py-2">Hora</th><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let d = each_array[$$index];
    $$payload.out += `<th class="border-b px-2 py-2">${escape_html(d)}</th>`;
  }
  $$payload.out += `<!--]--></tr></thead><tbody><!--[-->`;
  for (let hi = 0, $$length = each_array_1.length; hi < $$length; hi++) {
    let h = each_array_1[hi];
    const each_array_2 = ensure_array_like(days);
    $$payload.out += `<tr${attr_class(clsx(hi % 2 === 0 ? "bg-gray-50" : "bg-white"))}><td class="border-b px-2 py-2 font-mono text-base text-gray-700">${escape_html(h)}–${escape_html((parseInt(h) + 1).toString().padStart(2, "0"))}:00</td><!--[-->`;
    for (let $$index_2 = 0, $$length2 = each_array_2.length; $$index_2 < $$length2; $$index_2++) {
      let d = each_array_2[$$index_2];
      const each_array_3 = ensure_array_like(subjects);
      $$payload.out += `<td class="border-b px-2 py-2 align-top"><!--[-->`;
      for (let i = 0, $$length3 = each_array_3.length; i < $$length3; i++) {
        let s = each_array_3[i];
        if (s.day === d && timeToMinutes(s.startTime) <= timeToMinutes(h) && timeToMinutes(s.endTime) > timeToMinutes(h)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div${attr_style(`background-color: ${stringify(getColorForSubject(s.name))}`)} class="relative rounded-xl border border-blue-200 p-2 text-left break-words whitespace-pre-line shadow-md"><div class="absolute top-1 right-1 flex gap-1"><button class="text-yellow-600 hover:text-yellow-800" title="Editar" aria-label="Editar" style="background: transparent; border: none; padding: 0;"><i class="fa fa-pen"></i></button> <button class="text-red-600 hover:text-red-800" title="Eliminar" aria-label="Eliminar" style="background: transparent; border: none; padding: 0;"><i class="fa fa-trash"></i></button></div> <span class="font-semibold">${escape_html(s.name)}</span></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></td>`;
    }
    $$payload.out += `<!--]--></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div>`;
  bind_props($$props, { subjects });
  pop();
}
function ConfirmModal($$payload, $$props) {
  let message = fallback($$props["message"], "");
  let show = fallback($$props["show"], false);
  let onConfirm = $$props["onConfirm"];
  let onCancel = $$props["onCancel"];
  if (show) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"><div class="relative max-w-md min-w-[340px] rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl"><button class="absolute top-3 right-3 text-gray-400 transition-colors hover:text-red-500" aria-label="Cerrar"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <p class="mb-6 text-base text-gray-800">${escape_html(message)}</p> <div class="flex justify-end gap-3 pt-2"><button class="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow transition hover:bg-gray-300">Cancelar</button> <button class="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-red-700">Aceptar</button></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { message, show, onConfirm, onCancel });
}
function InputModal($$payload, $$props) {
  push();
  let show = fallback($$props["show"], false);
  let label = fallback($$props["label"], "");
  let defaultValue = fallback($$props["defaultValue"], "");
  let onSubmit = $$props["onSubmit"];
  let onCancel = $$props["onCancel"];
  let value = defaultValue;
  if (show) value = defaultValue;
  if (show) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"><form class="relative max-w-md min-w-[340px] rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl"><button class="absolute top-3 right-3 text-gray-400 transition-colors hover:text-red-500" type="button" aria-label="Cerrar"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <label for="input-modal-field" class="mb-4 block font-semibold text-gray-800">${escape_html(label)}</label> <input id="input-modal-field" class="mb-6 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow transition focus:border-blue-400 focus:outline-none"${attr("value", value)} required/> <div class="flex justify-end gap-3 pt-2"><button type="button" class="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow transition hover:bg-gray-300">Cancelar</button> <button type="submit" class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700">Aceptar</button></div></form></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    show,
    label,
    defaultValue,
    onSubmit,
    onCancel
  });
  pop();
}
function _page($$payload, $$props) {
  push();
  let isExportingPNG = false;
  let showConfirmReset = false;
  let showInputJSON = false;
  let showInputPNG = false;
  let pendingExportType = null;
  let tempFileName = "";
  let subjects = [];
  let message = "";
  let pendingDeleteIndex = null;
  function handleConfirmReset() {
    if (pendingDeleteIndex !== null) {
      subjects.splice(pendingDeleteIndex, 1);
      subjects = [...subjects];
      pendingDeleteIndex = null;
      showConfirmReset = false;
      return;
    }
    subjects = [];
    localStorage.removeItem("subjects");
    showConfirmReset = false;
  }
  function handleInputModalSubmit(value) {
    if (!value) {
      showInputJSON = false;
      showInputPNG = false;
      return;
    }
    if (pendingExportType === "json") {
      const blob = new Blob([JSON.stringify(subjects, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${value}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showInputJSON = false;
    }
    if (pendingExportType === "png") {
      isExportingPNG = true;
      message = "";
      showInputPNG = false;
      {
        isExportingPNG = false;
        showInputPNG = false;
        return;
      }
    }
    pendingExportType = null;
  }
  function handleInputModalCancel() {
    showInputJSON = false;
    showInputPNG = false;
    pendingExportType = null;
  }
  $$payload.out += `<main class="min-h-screen bg-gray-50 p-6 text-gray-800"><div class="relative mx-auto max-w-7xl"><div class="mb-6 flex items-center justify-between"><h1 class="mb-2 flex-1 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent drop-shadow-lg">Planificador de Horario Académico</h1> <a href="https://github.com/FrankSkep/schedule-planner" target="_blank" rel="noopener noreferrer" class="ml-4 inline-flex items-center gap-2 rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-700" aria-label="Ver en GitHub"><i class="fab fa-github fa-lg"></i> GitHub</a></div> <div class="mb-6 flex flex-col justify-between gap-3 md:flex-row"><div class="flex gap-3"><button class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow transition hover:bg-blue-700">+ Agregar materia</button> <button type="button" class="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-base font-semibold text-white shadow transition hover:bg-red-700">Limpiar horario</button></div> <div class="flex flex-col gap-3 md:ml-auto md:flex-row"><button class="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-base font-semibold text-white shadow transition hover:bg-green-700">Exportar JSON</button> <label class="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-base font-semibold text-gray-700 shadow transition hover:bg-gray-300">Importar JSON <input type="file" accept="application/json" class="hidden"/></label> <button class="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow transition hover:bg-indigo-700"${attr("disabled", isExportingPNG, true)}>`;
  if (isExportingPNG) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg class="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg> Exportando...`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `Exportar PNG`;
  }
  $$payload.out += `<!--]--></button></div></div> `;
  if (message) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="mb-4 font-semibold text-red-600">${escape_html(message)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div>`;
  ScheduleTable($$payload, { subjects });
  $$payload.out += `<!----></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  ConfirmModal($$payload, {
    show: showConfirmReset,
    message: pendingDeleteIndex !== null ? "¿Seguro que deseas eliminar esta materia?" : "¿Estás seguro de que deseas borrar todo el horario?",
    onConfirm: handleConfirmReset,
    onCancel: () => {
      showConfirmReset = false;
      pendingDeleteIndex = null;
    }
  });
  $$payload.out += `<!----> `;
  InputModal($$payload, {
    show: showInputJSON,
    label: "Escribe el nombre del archivo JSON:",
    defaultValue: tempFileName,
    onSubmit: handleInputModalSubmit,
    onCancel: handleInputModalCancel
  });
  $$payload.out += `<!----> `;
  InputModal($$payload, {
    show: showInputPNG,
    label: "Escribe el nombre del archivo PNG:",
    defaultValue: tempFileName,
    onSubmit: handleInputModalSubmit,
    onCancel: handleInputModalCancel
  });
  $$payload.out += `<!----></main>`;
  pop();
}
export {
  _page as default
};
