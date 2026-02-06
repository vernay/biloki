'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

type Step = 'type_logement' | 'acces' | 'ouverture_portail' | 'type_serrure' | 'distance_ab' | 'distance_bc' | 'sens_ouverture' | 'resultat';

interface WizardState {
  typeLogement: 'maison' | 'immeuble' | null;
  accesMaison: 'portail' | 'acces_direct' | 'autre' | null;
  accesImmeuble: string[];
  ouverturePortail: string[];
  typeSerrure: 'cylindre_europeen' | 'cylindre_rond' | 'autre' | 'inconnu' | null;
  distanceAB: number | null;
  distanceBC: number | null;
  sensOuverture: 'interieur' | 'exterieur' | null;
}

export default function SmartLockWizard() {
  const t = useTranslations('smartLockWizard');
  const [currentStep, setCurrentStep] = useState<Step>('type_logement');
  const [formData, setFormData] = useState<WizardState>({
    typeLogement: null,
    accesMaison: null,
    accesImmeuble: [],
    ouverturePortail: [],
    typeSerrure: null,
    distanceAB: 40,
    distanceBC: 40,
    sensOuverture: null,
  });
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleTypeLogement = (type: 'maison' | 'immeuble') => {
    setFormData({ ...formData, typeLogement: type });
    setCurrentStep('acces');
    scrollToContent();
  };

  const handleAccesMaison = (acces: 'portail' | 'acces_direct' | 'autre') => {
    setFormData({ ...formData, accesMaison: acces });
    setCurrentStep(acces === 'portail' ? 'ouverture_portail' : 'type_serrure');
    scrollToContent();
  };

  const validateAccesImmeuble = () => {
    setCurrentStep('sens_ouverture');
    scrollToContent();
  };

  const toggleArrayValue = (array: string[], value: string) => {
    return array.includes(value) ? array.filter(item => item !== value) : [...array, value];
  };

  const validateOuverturePortail = () => {
    setCurrentStep('type_serrure');
    scrollToContent();
  };

  const handleTypeSerrure = (type: 'cylindre_europeen' | 'cylindre_rond' | 'autre' | 'inconnu') => {
    setFormData({ ...formData, typeSerrure: type });
    setCurrentStep('sens_ouverture');
    scrollToContent();
  };

  const handleDistanceAB = () => {
    setCurrentStep('distance_bc');
    scrollToContent();
  };

  const handleDistanceABUnknown = () => {
    setFormData({ ...formData, distanceAB: null });
    setCurrentStep('distance_bc');
    scrollToContent();
  };

  const handleDistanceBC = () => {
    setCurrentStep('resultat');
    scrollToContent();
  };

  const handleDistanceBCUnknown = () => {
    setFormData({ ...formData, distanceBC: null });
    setCurrentStep('resultat');
    scrollToContent();
  };

  const handleSensOuverture = (sens: 'interieur' | 'exterieur') => {
    setFormData({ ...formData, sensOuverture: sens });
    setCurrentStep('distance_ab');
    scrollToContent();
  };

  const handleBack = () => {
    if (currentStep === 'acces') {
      setCurrentStep('type_logement');
      setFormData({
        typeLogement: null,
        accesMaison: null,
        accesImmeuble: [],
        ouverturePortail: [],
        typeSerrure: null,
        distanceAB: 40,
        distanceBC: 40,
        sensOuverture: null,
      });
    } else if (currentStep === 'ouverture_portail') {
      setCurrentStep('acces');
    } else if (currentStep === 'type_serrure') {
      setCurrentStep(formData.typeLogement === 'maison' && formData.accesMaison === 'portail' ? 'ouverture_portail' : 'acces');
    } else if (currentStep === 'sens_ouverture') {
      setCurrentStep('type_serrure');
    } else if (currentStep === 'distance_ab') {
      setCurrentStep('sens_ouverture');
    } else if (currentStep === 'distance_bc') {
      setCurrentStep('distance_ab');
    }
    scrollToContent();
  };

  const handleRestart = () => {
    setFormData({
      typeLogement: null,
      accesMaison: null,
      accesImmeuble: [],
      ouverturePortail: [],
      typeSerrure: null,
      distanceAB: 40,
      distanceBC: 40,
      sensOuverture: null,
    });
    setCurrentStep('type_logement');
    scrollToContent();
  };

  const handleBookDemo = () => {
    // Construire l'URL avec les paramètres de configuration
    const params = new URLSearchParams({
      type: 'serrure-connectee',
      logement: formData.typeLogement || '',
      acces: formData.typeLogement === 'maison' ? (formData.accesMaison || '') : formData.accesImmeuble.join(','),
      serrure: formData.typeSerrure || '',
      distanceAB: formData.distanceAB?.toString() || 'inconnu',
      distanceBC: formData.distanceBC?.toString() || 'inconnu',
      sensOuverture: formData.sensOuverture || '',
    });
    if (formData.ouverturePortail.length > 0) {
      params.set('ouverturePortail', formData.ouverturePortail.join(','));
    }
    window.location.href = `/fr/reserver-demo?${params.toString()}`;
  };

  const stepsOrder: Step[] = ['type_logement', 'acces', 'ouverture_portail', 'type_serrure', 'sens_ouverture', 'distance_ab', 'distance_bc', 'resultat'];
  const currentStepIndex = Math.max(0, stepsOrder.indexOf(currentStep));
  const progressValue = ((currentStepIndex + 1) / stepsOrder.length) * 100;

  const cardClass = "bg-white/90 backdrop-blur rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_-35px_rgba(4,164,255,0.45)] border border-primary/10";
  const optionButtonClass = "w-full p-6 border-2 border-gray-200 rounded-2xl bg-white hover:border-primary hover:bg-primary/5 transition-all text-left group";
  const optionLabelClass = "text-xl font-semibold text-gray-800 group-hover:text-primary";
  const backButtonClass = "text-primary hover:text-primary/80 font-semibold mb-6 flex items-center gap-2";
  const primaryButtonClass = "w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all text-lg shadow-md";
  const secondaryButtonClass = "w-full border-2 border-gray-300 hover:border-primary text-gray-600 hover:text-primary font-semibold py-4 rounded-xl transition-all text-lg";
  const outlinePrimaryButtonClass = "w-full border-2 border-primary text-primary hover:bg-primary/5 font-bold py-4 rounded-xl transition-all text-lg";
  const checkboxClass = "w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary";

  return (
    <div ref={contentRef} className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('title')}</h2>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="mb-8 rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progressValue}%` }} />
          </div>
          <span className="text-xs font-semibold text-gray-500">
            {currentStepIndex + 1}/{stepsOrder.length}
          </span>
        </div>
      </div>
      {/* ÉTAPE 1: Type de logement */}
      {currentStep === 'type_logement' && (
        <div className={cardClass}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('step1.title')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('step1.description')}</p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleTypeLogement('maison')}
              className={optionButtonClass}
            >
              <span className={optionLabelClass}>{t('step1.maison')}</span>
            </button>
            
            <button
              onClick={() => handleTypeLogement('immeuble')}
              className={optionButtonClass}
            >
              <span className={optionLabelClass}>{t('step1.immeuble')}</span>
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 2: Accès Maison */}
      {currentStep === 'acces' && formData.typeLogement === 'maison' && (
        <div className={cardClass}>
          <button onClick={handleBack} className={backButtonClass}>
            ← {t('back')}
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('step2Maison.title')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('step2Maison.description')}</p>
          
          <div className="space-y-4">
            {['portail', 'acces_direct', 'autre'].map(option => (
              <button
                key={option}
                onClick={() => handleAccesMaison(option as any)}
                className={optionButtonClass}
              >
                <span className={optionLabelClass}>{t(`step2Maison.${option}`)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ÉTAPE 2: Accès Immeuble */}
      {currentStep === 'acces' && formData.typeLogement === 'immeuble' && (
        <div className={cardClass}>
          <button onClick={handleBack} className={backButtonClass}>
            ← {t('back')}
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('step2Immeuble.title')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('step2Immeuble.description')}</p>
          
          <div className="space-y-4 mb-8">
            {['digicode', 'badge', 'cle'].map(option => (
              <label key={option} className="flex items-center p-6 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                <input
                  type="checkbox"
                  checked={formData.accesImmeuble.includes(option)}
                  onChange={() => setFormData({ ...formData, accesImmeuble: toggleArrayValue(formData.accesImmeuble, option) })}
                  className={checkboxClass}
                />
                <span className="ml-4 text-xl font-semibold text-gray-800">{t(`step2Immeuble.${option}`)}</span>
              </label>
            ))}
          </div>
          
          <button
            onClick={validateAccesImmeuble}
            disabled={formData.accesImmeuble.length === 0}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-all text-lg shadow-md"
          >
            {t('validate')}
          </button>
        </div>
      )}

      {/* ÉTAPE 3: Ouverture Portail */}
      {currentStep === 'ouverture_portail' && (
        <div className={cardClass}>
          <button onClick={handleBack} className={backButtonClass}>
            ← {t('back')}
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('step3.title')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('step3.description')}</p>
          
          <div className="space-y-4 mb-8">
            {['digicode', 'telecommande', 'badge', 'cle'].map(option => (
              <label key={option} className="flex items-center p-6 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                <input
                  type="checkbox"
                  checked={formData.ouverturePortail.includes(option)}
                  onChange={() => setFormData({ ...formData, ouverturePortail: toggleArrayValue(formData.ouverturePortail, option) })}
                  className={checkboxClass}
                />
                <span className="ml-4 text-xl font-semibold text-gray-800">{t(`step3.${option}`)}</span>
              </label>
            ))}
          </div>
          
          <button
            onClick={validateOuverturePortail}
            disabled={formData.ouverturePortail.length === 0}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-all text-lg shadow-md"
          >
            {t('validate')}
          </button>
        </div>
      )}

      {/* ÉTAPE 4: Type de serrure */}
      {currentStep === 'type_serrure' && (
        <div className={cardClass}>
          <button onClick={handleBack} className={backButtonClass}>
            ← {t('back')}
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('step4.title')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('step4.description')}</p>
          
          <div className="space-y-4">
            {['cylindre_europeen', 'cylindre_rond', 'autre', 'inconnu'].map(option => (
              <button
                key={option}
                onClick={() => handleTypeSerrure(option as any)}
                className={optionButtonClass}
              >
                <span className={optionLabelClass}>{t(`step4.${option}`)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ÉTAPE 5: Distance A-B (uniquement pour Maison) */}
      {currentStep === 'distance_ab' && (
        <div className={cardClass}>
          <button onClick={handleBack} className={backButtonClass}>
            ← {t('back')}
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('stepDistance.title')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('stepDistance.description')}</p>
          
          {/* Image de la porte avec mesure */}
          <div className="bg-white rounded-2xl border border-dashed border-primary/40 p-6 mb-8 flex items-center justify-center">
            <div className="h-48 w-full max-w-md rounded-xl bg-primary/5" aria-label={t('imagePlaceholder')} role="img" />
          </div>
          
          {/* Slider de mesure */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-white font-bold text-2xl px-6 py-3 rounded-xl shadow-md">
                {formData.distanceAB} mm
              </div>
            </div>
            <input
              type="range"
              min="25"
              max="70"
              value={formData.distanceAB || 40}
              onChange={(e) => setFormData({ ...formData, distanceAB: parseInt(e.target.value) })}
              aria-label={t('stepDistance.title')}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>25 mm</span>
              <span>70 mm</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleDistanceAB}
              className={primaryButtonClass}
            >
              {t('validate')}
            </button>
            
            <button
              onClick={handleDistanceABUnknown}
              className={secondaryButtonClass}
            >
              {t('stepDistance.unknown')}
            </button>
          </div>
      )}

      {/* ÉTAPE 6: Distance B-C (côté extérieur) */}
      {currentStep === 'distance_bc' && (
        <div className={cardClass}>
          <button onClick={handleBack} className={backButtonClass}>
            ← {t('back')}
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('stepDistanceBC.title')}</h2>
          <p className="text-primary mb-8 text-lg">{t('stepDistanceBC.description')}</p>
          
          {/* Image de la porte avec mesure B-C */}
          <div className="bg-white rounded-2xl border border-dashed border-primary/40 p-6 mb-8 flex items-center justify-center">
            <div className="h-48 w-full max-w-md rounded-xl bg-primary/5" aria-label={t('imagePlaceholder')} role="img" />
          </div>
          
          {/* Slider de mesure */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-white font-bold text-2xl px-6 py-3 rounded-xl shadow-md">
                {formData.distanceBC} mm
              </div>
            </div>
            <input
              type="range"
              min="25"
              max="70"
              value={formData.distanceBC || 40}
              onChange={(e) => setFormData({ ...formData, distanceBC: parseInt(e.target.value) })}
              aria-label={t('stepDistanceBC.title')}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>25 mm</span>
              <span>70 mm</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleDistanceBC}
              className={primaryButtonClass}
            >
              {t('validate')}
            </button>
            
            <button
              onClick={handleDistanceBCUnknown}
              className={secondaryButtonClass}
            >
              {t('stepDistanceBC.unknown')}
            </button>
          </div>
      )}

      {/* ÉTAPE 7: Sens d'ouverture (CONVERGENCE) */}
      {currentStep === 'sens_ouverture' && (
        <div className={cardClass}>
          <button onClick={handleBack} className={backButtonClass}>
            ← {t('back')}
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('step5.title')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('step5.description')}</p>
          
          <div className="space-y-4">
            {['interieur', 'exterieur'].map(option => (
              <button
                key={option}
                onClick={() => handleSensOuverture(option as any)}
                className={optionButtonClass}
              >
                <span className={optionLabelClass}>{t(`step5.${option}`)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RÉSULTAT */}
      {currentStep === 'resultat' && (
        <div className="bg-gradient-to-br from-primary/10 via-white to-white rounded-3xl p-8 md:p-10 shadow-[0_25px_70px_-35px_rgba(4,164,255,0.45)] border border-primary/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('result.title')}</h2>
            <p className="text-gray-700 text-xl mb-8">{t('result.description')}</p>
          </div>

          <div className="bg-white/90 rounded-2xl p-6 mb-8 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('result.summary')}</h3>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                <span className="font-semibold text-gray-900">{t('result.property')}:</span>{' '}
                {formData.typeLogement === 'maison' ? t('step1.maison') : t('step1.immeuble')}
              </p>
              <p>
                <span className="font-semibold text-gray-900">{t('result.access')}:</span>{' '}
                {formData.typeLogement === 'maison'
                  ? t(`step2Maison.${formData.accesMaison}`)
                  : formData.accesImmeuble.map(v => t(`step2Immeuble.${v}`)).join(', ')}
              </p>
              {formData.ouverturePortail.length > 0 && (
                <p>
                  <span className="font-semibold text-gray-900">{t('result.portalOpening')}:</span>{' '}
                  {formData.ouverturePortail.map(v => t(`step3.${v}`)).join(', ')}
                </p>
              )}
              {formData.typeSerrure && (
                <p>
                  <span className="font-semibold text-gray-900">{t('result.lockType')}:</span>{' '}
                  {t(`step4.${formData.typeSerrure}`)}
                </p>
              )}
              {formData.typeLogement === 'maison' && (
                <p>
                  <span className="font-semibold text-gray-900">{t('result.distanceAB')}:</span>{' '}
                  {formData.distanceAB ? `${formData.distanceAB} mm` : t('stepDistance.unknown')}
                </p>
              )}
              {formData.typeLogement === 'maison' && (
                <p>
                  <span className="font-semibold text-gray-900">{t('result.distanceBC')}:</span>{' '}
                  {formData.distanceBC ? `${formData.distanceBC} mm` : t('stepDistanceBC.unknown')}
                </p>
              )}
              <p>
                <span className="font-semibold text-gray-900">{t('result.doorOpening')}:</span>{' '}
                {t(`step5.${formData.sensOuverture}`)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleBookDemo}
              className={primaryButtonClass}
            >
              {t('result.bookDemo')}
            </button>
            <button
              onClick={handleRestart}
              className={outlinePrimaryButtonClass}
            >
              {t('restart')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
