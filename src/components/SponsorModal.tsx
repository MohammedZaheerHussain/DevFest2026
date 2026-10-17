import React, { useState } from 'react';
import type { SponsorCustomization, CardItem } from '../types/game';
import { DEFAULT_CARD_ITEMS, SPONSOR_PRESETS } from '../constants/logos';
import { Card } from './Card';
import { CloseIcon } from '../constants/icons';

interface SponsorModalProps {
  currentConfig: SponsorCustomization | null;
  onSave: (config: SponsorCustomization | null) => void;
  onClose: () => void;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({
  currentConfig,
  onSave,
  onClose,
}) => {
  const [enabled, setEnabled] = useState<boolean>(currentConfig?.enabled ?? false);
  const [targetPairId, setTargetPairId] = useState<string>(
    currentConfig?.targetPairId || 'firebase'
  );
  const [sponsorName, setSponsorName] = useState<string>(
    currentConfig?.sponsorName || 'DevFest Title Partner'
  );
  const [sponsorTier, setSponsorTier] = useState<string>(
    currentConfig?.sponsorTier || 'Title Sponsor'
  );
  const [sponsorColor, setSponsorColor] = useState<string>(
    currentConfig?.sponsorColor || '#FF6D00'
  );

  const handleApplyPreset = (presetId: string) => {
    const preset = SPONSOR_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setEnabled(true);
      setSponsorName(preset.name);
      setSponsorTier(preset.tier);
      setSponsorColor(preset.color);
    }
  };

  const handleSave = () => {
    if (!enabled) {
      onSave(null);
    } else {
      onSave({
        enabled: true,
        targetPairId,
        sponsorName: sponsorName.trim() || 'DevFest Sponsor',
        sponsorTier: sponsorTier.trim() || 'Partner',
        sponsorColor,
      });
    }
    onClose();
  };

  const handleReset = () => {
    setEnabled(false);
    onSave(null);
    onClose();
  };

  // Mock preview card state
  const previewCardState = {
    id: 'preview-card',
    pairId: enabled ? 'sponsor' : targetPairId,
    name: enabled ? sponsorName : DEFAULT_CARD_ITEMS.find((c: CardItem) => c.pairId === targetPairId)?.name || 'Logo',
    category: enabled ? 'Event Partner' : 'Developer Ecosystem',
    color: enabled ? sponsorColor : '#4285F4',
    glowColor: enabled ? sponsorColor : 'rgba(66, 133, 244, 0.6)',
    isSponsor: enabled,
    sponsorTier: enabled ? sponsorTier : undefined,
    isFlipped: true,
    isMatched: false,
  };

  return (
    <div
      className="sponsor-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sponsor-modal-title"
      data-ui="modal"
    >
      <div className="sponsor-modal-card">
        {/* Modal Header */}
        <div className="sponsor-modal-header">
          <div className="sponsor-header-left">
            <h2 id="sponsor-modal-title">Sponsor Logo Replacement</h2>
            <p className="sponsor-modal-sub">
              Feature competition sponsors by replacing any default icon with branded sponsor cards.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="sponsor-modal-body">
          {/* Toggle enable */}
          <div className="sponsor-toggle-row">
            <label className="toggle-switch-container">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
            <div className="toggle-info">
              <span className="toggle-title">
                {enabled ? 'Sponsor Card Replacement Active' : 'Enable Sponsor Replacement'}
              </span>
              <span className="toggle-desc">
                When enabled, the selected icon pair will display the sponsor brand.
              </span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="presets-block">
            <span className="presets-title">SPONSOR PRESETS</span>
            <div className="presets-pills">

              {SPONSOR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="preset-pill-btn"
                  onClick={() => handleApplyPreset(preset.id)}
                  style={{ borderLeftColor: preset.color }}
                >
                  <span className="preset-name">{preset.name}</span>
                  <span className="preset-tier">{preset.tier}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Form & Live Card Preview */}
          <div className="sponsor-config-layout">
            <div className="sponsor-form-fields">
              <div className="form-group">
                <label htmlFor="target-slot">Card to Replace</label>
                <select
                  id="target-slot"
                  value={targetPairId}
                  onChange={(e) => setTargetPairId(e.target.value)}
                  disabled={!enabled}
                >
                  {DEFAULT_CARD_ITEMS.map((item: CardItem) => (
                    <option key={item.pairId} value={item.pairId}>
                      {item.name} ({item.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sponsor-name-input">Sponsor / Partner Name</label>
                <input
                  id="sponsor-name-input"
                  type="text"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="e.g. Acme Tech Labs"
                  disabled={!enabled}
                  maxLength={25}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sponsor-tier-input">Badge / Tier Label</label>
                <input
                  id="sponsor-tier-input"
                  type="text"
                  value={sponsorTier}
                  onChange={(e) => setSponsorTier(e.target.value)}
                  placeholder="e.g. Title Sponsor, Gold Partner"
                  disabled={!enabled}
                  maxLength={18}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sponsor-color-input">Accent Brand Color</label>
                <div className="color-picker-row">
                  <input
                    id="sponsor-color-input"
                    type="color"
                    value={sponsorColor}
                    onChange={(e) => setSponsorColor(e.target.value)}
                    disabled={!enabled}
                  />
                  <span className="color-hex-val">{sponsorColor.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Live Preview of the Card */}
            <div className="sponsor-preview-box">
              <span className="preview-label">LIVE CARD PREVIEW</span>
              <div className="preview-card-holder">
                <Card card={previewCardState} onClick={() => {}} disabled={false} />
              </div>
              <span className="preview-caption">
                {enabled
                  ? `Replaces: ${DEFAULT_CARD_ITEMS.find((c: CardItem) => c.pairId === targetPairId)?.name || ''}`
                  : 'Default cards active'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sponsor-modal-footer">
          <button type="button" className="btn-secondary" onClick={handleReset}>
            Reset to Defaults
          </button>
          <div className="footer-right-btns">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn-primary" onClick={handleSave}>
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
