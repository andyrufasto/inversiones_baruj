export class PoliciesRenderer {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
    }

    render() {
        if (!this.container) return;
        
        const html = this.data.map(policy => {
            const fileUrl = `/politicas/${encodeURI(policy.file)}`;
            return `
                <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between h-full gs-stagger-policy group hover:bg-brand-cerulean/5">
                    <div class="flex items-start gap-4 mb-6">
                        <div class="mt-1 text-brand-cerulean text-2xl group-hover:scale-110 transition-transform"><i class="fa-regular fa-file-pdf drop-shadow-[0_0_5px_rgba(37,150,190,0.3)]"></i></div>
                        <h4 class="font-bold text-sm leading-snug">${policy.name}</h4>
                    </div>
                    <div class="flex gap-3 w-full mt-auto">
                        <a href="${fileUrl}" target="_blank" class="flex-1 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-bold rounded-lg uppercase tracking-wider transition border border-black/10 dark:border-white/10 text-center backdrop-blur-sm active:scale-95"><i class="fa-solid fa-eye mr-1"></i> Ver PDF</a>
                        <a href="${fileUrl}" download="${policy.file}" class="flex-1 py-3 bg-brand-cerulean/10 text-brand-cerulean hover:bg-brand-cerulean hover:text-white text-xs font-bold rounded-lg uppercase tracking-wider transition border border-brand-cerulean/30 text-center backdrop-blur-sm active:scale-95"><i class="fa-solid fa-download mr-1"></i> Descargar</a>
                    </div>
                </div>
            `;
        }).join('');

        this.container.innerHTML = html;
    }
}