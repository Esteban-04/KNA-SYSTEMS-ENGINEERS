import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServiceExplorer from './components/ServiceExplorer';
import InteractiveBlueprint from './components/InteractiveBlueprint';
import QuoteConfigurator from './components/QuoteConfigurator';
import AboutAndCoverage from './components/AboutAndCoverage';
import Footer from './components/Footer';
import { SERVICES, type SectorId, type SpecificSectorId } from './data/knaData';

export default function App() {
  const [selectedServices, setSelectedServices] = useState<string[]>([SERVICES[0].id]);
  const [activeSector, setActiveSector] = useState<SectorId>('todos');
  const [quoteSector, setQuoteSector] = useState<SpecificSectorId>('comercial');

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSectorChange = (sector: SectorId) => {
    setActiveSector(sector);
    if (sector !== 'todos') {
      setQuoteSector(sector);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectAndQuote = (serviceId: string) => {
    setSelectedServices((prev) => (prev.includes(serviceId) ? prev : [...prev, serviceId]));
    scrollToSection('cotizador');
  };

  const handleApplyPresetToQuote = (serviceIds: string[]) => {
    setSelectedServices(serviceIds);
    scrollToSection('cotizador');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-900">
      <Navbar onGoToQuote={() => scrollToSection('cotizador')} />

      <main className="flex-1">
        <HeroSection
          onStartQuote={() => scrollToSection('cotizador')}
          onExploreServices={() => scrollToSection('servicios')}
          onSelectServiceAndQuote={handleSelectAndQuote}
        />

        <ServiceExplorer
          activeSector={activeSector}
          onChangeSector={handleSectorChange}
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onGoToQuote={() => scrollToSection('cotizador')}
        />

        <InteractiveBlueprint onApplyPresetToQuote={handleApplyPresetToQuote} />

        <QuoteConfigurator
          sector={quoteSector}
          onChangeSector={setQuoteSector}
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onResetServices={() => setSelectedServices([])}
        />

        <AboutAndCoverage />
      </main>

      <Footer />
    </div>
  );
}
