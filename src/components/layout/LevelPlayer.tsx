'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { LevelData } from '@/data/schema';
import { compareWithTarget, type MatchMode } from '@/engine/differ';
import { validateHtmlStructure, type ValidationError } from '@/engine/validator';
import type { Locale } from '@/i18n';
import { useProgressStore } from '@/store/progressStore';
import { useTranslation } from '@/i18n';
import TagSelector from '@/components/editor/TagSelector';
import FillInBlank from '@/components/editor/FillInBlank';
import DomTreeView from '@/components/visualizer/DomTreeView';
import FeedbackPanel from '@/components/feedback/FeedbackPanel';
import SuccessModal from '@/components/feedback/SuccessModal';
import TargetStructureView from '@/components/visualizer/TargetStructureView';

const CodeEditor = dynamic(() => import('@/components/editor/CodeEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-slate-500">
      Loading...
    </div>
  ),
});

const PROBLEM_TYPE_KEY: Record<string, string> = {
  TAG_SELECT: 'level.tagSelect',
  FILL_BLANK: 'level.fillBlank',
  DIRECT_INPUT: 'level.directInput',
  FIX_ERROR: 'level.fixError',
  SEMANTIC_CHOICE: 'level.semanticChoice',
};

interface LevelPlayerProps {
  level: LevelData;
  hasNext: boolean;
  onNext: () => void;
}

export default function LevelPlayer({ level, hasNext, onNext }: LevelPlayerProps) {
  const { t, tArray, locale } = useTranslation();
  const [userCode, setUserCode] = useState(level.starterCode ?? level.brokenCode ?? '');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { completeLevel, incrementAttempt, isCompleted } = useProgressStore();
  const alreadyCompleted = isCompleted(level.id);

  useEffect(() => {
    setUserCode(level.starterCode ?? level.brokenCode ?? '');
    setErrors([]);
    setIsCorrect(false);
    setShowHint(false);
    setShowSuccess(false);
    setFeedbackMessage('');
    setSelectedTag(null);
    setIsSubmitted(false);
  }, [level.id, level.starterCode, level.brokenCode]);

  const getRandomCorrect = useCallback(() => {
    const msgs = tArray('feedback.correct');
    return msgs[Math.floor(Math.random() * msgs.length)] ?? 'Correct!';
  }, [tArray]);

  const handleCodeChange = useCallback((code: string) => {
    setUserCode(code);
    const result = validateHtmlStructure(code, locale as Locale);
    setErrors(result.errors);
  }, [locale]);

  const checkAnswer = useCallback(
    (codeToCheck?: string) => {
      const code = codeToCheck ?? userCode;
      incrementAttempt(level.id);

      const validation = validateHtmlStructure(code, locale as Locale);
      setErrors(validation.errors);

      if (level.validator.forbiddenTags) {
        for (const tag of level.validator.forbiddenTags) {
          const regex = new RegExp(`<${tag}[\\s>]`, 'i');
          if (regex.test(code)) {
            setFeedbackMessage(t('feedback.forbiddenTag', { tag }));
            setIsCorrect(false);
            return;
          }
        }
      }

      if (level.validator.requiredTags) {
        for (const tag of level.validator.requiredTags) {
          const regex = new RegExp(`<${tag}[\\s>/]`, 'i');
          if (!regex.test(code)) {
            setFeedbackMessage(t('feedback.missingTag', { tag }));
            setIsCorrect(false);
            return;
          }
        }
      }

      const result = compareWithTarget(
        code,
        level.targetStructure,
        level.validator.mode as MatchMode
      );

      if (result.isCorrect) {
        setIsCorrect(true);
        setFeedbackMessage(getRandomCorrect());
        setShowSuccess(true);
        completeLevel(level.id, showHint);
      } else {
        setIsCorrect(false);
        if (result.missingNodes.length > 0) {
          setFeedbackMessage(t('feedback.needTag', { tag: result.missingNodes.join(', ') }));
        } else {
          setFeedbackMessage(t('feedback.wrongStructure'));
        }
      }
    },
    [userCode, level, showHint, completeLevel, incrementAttempt, t, getRandomCorrect]
  );

  const handleTagSelect = useCallback(
    (tag: string) => {
      setSelectedTag(tag);
      setIsSubmitted(true);
      const code = `<${tag}>${level.targetStructure.textContent ?? ''}</${tag}>`;
      setUserCode(code);
      checkAnswer(code);
    },
    [level, checkAnswer]
  );

  const handleFillSubmit = useCallback(
    (filled: string) => {
      setUserCode(filled);
      setIsSubmitted(true);
      checkAnswer(filled);
    },
    [checkAnswer]
  );

  const handleSemanticSelect = useCallback(
    (tag: string) => {
      setSelectedTag(tag);
      setIsSubmitted(true);
      const code = `<${tag}></${tag}>`;
      setUserCode(code);
      checkAnswer(code);
    },
    [checkAnswer]
  );

  const renderEditor = () => {
    switch (level.problemType) {
      case 'TAG_SELECT':
        return (
          <TagSelector
            options={level.options ?? []}
            onSelect={handleTagSelect}
            disabled={isCorrect}
            selectedTag={selectedTag}
            correctTag={isSubmitted ? level.targetStructure.tag : undefined}
          />
        );
      case 'FILL_BLANK':
        return (
          <FillInBlank
            template={level.template ?? ''}
            onSubmit={handleFillSubmit}
            disabled={isCorrect}
          />
        );
      case 'SEMANTIC_CHOICE':
        return (
          <div className="space-y-4 p-4">
            {level.context && (
              <div className="rounded-lg bg-slate-800/50 p-4 text-sm text-slate-300">
                <span className="mb-1 block text-xs font-medium text-slate-500">
                  {t('level.context')}
                </span>
                {level.context}
              </div>
            )}
            <TagSelector
              options={level.options ?? []}
              onSelect={handleSemanticSelect}
              disabled={isCorrect}
              selectedTag={selectedTag}
              correctTag={isSubmitted ? level.targetStructure.tag : undefined}
            />
          </div>
        );
      case 'DIRECT_INPUT':
      case 'FIX_ERROR':
        return (
          <div className="flex h-full flex-col">
            <div className="flex-1">
              <CodeEditor
                initialValue={userCode}
                onChange={handleCodeChange}
                readOnly={isCorrect}
              />
            </div>
            <div className="flex items-center justify-between border-t border-slate-700 px-4 py-3">
              <div className="text-sm text-slate-400">
                {isCorrect ? (
                  <span className="text-green-400">{t('common.correct')}</span>
                ) : feedbackMessage ? (
                  <span className="text-yellow-400">{feedbackMessage}</span>
                ) : null}
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(true);
                  checkAnswer();
                }}
                disabled={isCorrect}
                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('common.check')}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">{level.title}</h2>
            {alreadyCompleted && (
              <span className="rounded-full bg-green-900/50 px-2 py-0.5 text-xs text-green-400">
                {t('common.completed')}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-blue-400">{level.learningPoint}</p>
        </div>
        <div className="flex items-center gap-2">
          {level.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              {showHint ? t('common.hideHint') : t('common.hint')}
            </button>
          )}
        </div>
      </div>

      {showHint && level.hint && (
        <div className="border-b border-slate-700 bg-amber-950/30 px-6 py-3 text-sm text-amber-300">
          💡 {level.hint}
        </div>
      )}

      <div className="grid flex-1 grid-cols-1 gap-0 overflow-hidden lg:grid-cols-3">
        <div className="flex flex-col border-r border-slate-700 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-400">{t('level.goal')}</h3>
          <div className="mb-4 rounded-lg bg-slate-800 p-4 text-sm text-slate-200">
            {level.instructions}
          </div>
          <h3 className="mb-2 text-sm font-semibold text-slate-400">{t('level.targetStructure')}</h3>
          <TargetStructureView target={level.targetStructure} />
        </div>

        <div className="flex flex-col border-r border-slate-700">
          <div className="border-b border-slate-700 px-4 py-2">
            <span className="text-xs font-medium text-slate-500">
              {t(PROBLEM_TYPE_KEY[level.problemType] ?? level.problemType)}
            </span>
          </div>
          <div className="flex-1 overflow-auto">{renderEditor()}</div>
        </div>

        <div className="flex flex-col p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-400">{t('level.domTree')}</h3>
          <div className="flex-1 overflow-auto">
            <DomTreeView html={userCode} />
          </div>
          {errors.length > 0 && (
            <div className="mt-3">
              <FeedbackPanel errors={errors} />
            </div>
          )}
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        message={level.successMessage}
        onNext={onNext}
        hasNext={hasNext}
      />
    </div>
  );
}
