import { Button } from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section id="contact" className="section-padding bg-primary text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-accent/5 -skew-x-12 -translate-x-1/2" />

      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 text-white">
          Ready to Transform Your <span className="text-accent">Visual</span> Environment?
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Consult with our engineering team to design a custom visual solution 
          tailored to your project's specific technical requirements.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full bg-accent hover:bg-accent/90 px-10 h-14 text-lg">
            Request a Consultation
          </Button>
          <Button size="lg" variant="outline" className="rounded-full border-white text-white bg-transparent hover:bg-white hover:text-primary px-10 h-14 text-lg transition-all duration-300">
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}
