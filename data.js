// Mock data for the prototype, ported from the original TS source.

window.MOCK_USERS = [
  { id: 'user-1', email: 'admin@smithdepo.com',  name: 'Sarah Johnson',     role: 'admin',  organization: { name: 'Smith Deposition Services', type: 'deposition_firm' } },
  { id: 'user-2', email: 'editor@smithdepo.com', name: 'Michael Chen',      role: 'editor', organization: { name: 'Smith Deposition Services', type: 'deposition_firm' } },
  { id: 'user-3', email: 'admin@lawfirm.com',    name: 'Jennifer Martinez', role: 'admin',  organization: { name: 'Martinez & Associates',     type: 'law_firm' } },
  { id: 'user-4', email: 'reader@lawfirm.com',   name: 'David Park',        role: 'reader', organization: { name: 'Martinez & Associates',     type: 'law_firm' } },
];

window.MOCK_CASES = [
  { id: 'case-001', caseNumber: 'CV-2024-001234', caseName: 'TechCorp Employment Dispute',     description: 'Contract violations and employment disputes involving multiple employees and alleged breach of non-compete agreements.', type: 'Contract Dispute',     client: 'TechCorp Inc.',          openedDate: 'March 15, 2024',    depositionCount: 3, lastActivity: 'June 5, 2024' },
  { id: 'case-002', caseNumber: 'CV-2024-005678', caseName: 'Medical Malpractice — Rodriguez', description: 'Medical malpractice claim involving alleged surgical errors and post-operative complications.',                          type: 'Medical Malpractice', client: 'Rodriguez Family',       openedDate: 'February 8, 2024',  depositionCount: 2, lastActivity: 'May 29, 2024' },
  { id: 'case-003', caseNumber: 'CV-2024-002456', caseName: 'Walsh v. Acme Transport',         description: 'Personal injury claim resulting from auto accident on Highway 101. Plaintiff suffered severe injuries.',                       type: 'Personal Injury',     client: 'Jennifer Walsh',         openedDate: 'January 22, 2024',  depositionCount: 3, lastActivity: 'June 10, 2024' },
  { id: 'case-004', caseNumber: 'CV-2024-003789', caseName: 'Securities Fraud Investigation',  description: 'Complex securities fraud case involving alleged insider trading and financial misconduct by corporate executives.',          type: 'Securities Fraud',    client: 'SEC Investigation Team', openedDate: 'December 3, 2023',  depositionCount: 1, lastActivity: 'May 16, 2024' },
  { id: 'case-005', caseNumber: 'CV-2024-001987', caseName: 'Riverside Property Dispute',      description: 'Real estate breach of contract case involving commercial property transaction and alleged misrepresentation.',               type: 'Real Estate',         client: 'Thompson Properties LLC',openedDate: 'April 1, 2024',     depositionCount: 1, lastActivity: 'April 23, 2024' },
  { id: 'case-006', caseNumber: 'CV-2024-004321', caseName: 'Innovate Labs IP Litigation',     description: 'Intellectual property dispute involving patent infringement claims and trade secret misappropriation.',                       type: 'Corporate Litigation',client: 'Innovate Labs Corp',     openedDate: 'November 12, 2023', depositionCount: 3, lastActivity: 'June 9, 2024' },
];

window.MOCK_DEPOSITIONS = [
  { id: 'depo-001', title: 'Sarah Chen Deposition',                title: 'Sarah Chen Deposition',                witness: 'Sarah Chen',           date: 'June 3, 2024',  duration: 9,    status: 'ready',      caseNumber: 'CV-2024-001234', goals: { total: 4, covered: 3 },   tags: ['Contract Dispute','Employment'],                  transcriptSource: 'mixed',        videos: [{ part: 1, duration: 9 }] },
  { id: 'depo-002', title: 'Michael Rodriguez Expert Testimony',   witness: 'Dr. Michael Rodriguez',date: 'May 28, 2024',  duration: 142,  status: 'ready',      caseNumber: 'CV-2024-005678', goals: { total: 8, covered: 8 },   tags: ['Medical Malpractice','Expert Witness'],           transcriptSource: 'verified',     videos: [{ part: 1, duration: 78 },{ part: 2, duration: 64 }] },
  { id: 'depo-003', title: 'Jennifer Walsh Initial Deposition',    witness: 'Jennifer Walsh',       date: 'June 10, 2024', duration: 67,   status: 'processing', caseNumber: 'CV-2024-002456', goals: { total: 0, covered: 0 },   tags: ['Personal Injury','Auto Accident'],                transcriptSource: 'ai-generated', videos: [{ part: 1, duration: 67 }] },
  { id: 'depo-004', title: 'Thomas Kim Financial Review',          witness: 'Thomas Kim',           date: 'May 15, 2024',  duration: 201,  status: 'ready',      caseNumber: 'CV-2024-003789', goals: { total: 12, covered: 10 }, tags: ['Securities Fraud','Financial'],                   transcriptSource: 'ai-generated', videos: [{ part: 1, duration: 98 },{ part: 2, duration: 103 }] },
  { id: 'depo-005', title: 'Emma Thompson Witness Statement',      witness: 'Emma Thompson',        date: 'April 22, 2024',duration: 45,   status: 'draft',      caseNumber: 'CV-2024-001987', goals: { total: 5, covered: 2 },   tags: ['Real Estate','Breach of Contract'],               transcriptSource: 'verified',     videos: [{ part: 1, duration: 45 }] },
  { id: 'depo-006', title: 'David Park CEO Deposition',            witness: 'David Park',           date: 'June 8, 2024',  duration: 178,  status: 'ready',      caseNumber: 'CV-2024-004321', goals: { total: 15, covered: 14 }, tags: ['Corporate Litigation','IP Dispute'],              transcriptSource: 'mixed',        videos: [{ part: 1, duration: 89 },{ part: 2, duration: 89 }] },
  { id: 'depo-007', title: 'Robert Martinez HR Director',          witness: 'Robert Martinez',      date: 'May 20, 2024',  duration: 95,   status: 'ready',      caseNumber: 'CV-2024-001234', goals: { total: 6, covered: 5 },   tags: ['Contract Dispute','Employment','HR Policies'],    transcriptSource: 'verified',     videos: [{ part: 1, duration: 95 }] },
  { id: 'depo-008', title: 'Lisa Anderson VP Operations',          witness: 'Lisa Anderson',        date: 'April 10, 2024',duration: 134,  status: 'ready',      caseNumber: 'CV-2024-001234', goals: { total: 7, covered: 6 },   tags: ['Contract Dispute','Employment','Operations'],     transcriptSource: 'mixed',        videos: [{ part: 1, duration: 67 },{ part: 2, duration: 67 }] },
  { id: 'depo-009', title: 'Dr. Rachel Kim Medical Expert',        witness: 'Dr. Rachel Kim',       date: 'April 15, 2024',duration: 156,  status: 'ready',      caseNumber: 'CV-2024-005678', goals: { total: 9, covered: 9 },   tags: ['Medical Malpractice','Expert Witness','Surgical'],transcriptSource: 'verified',     videos: [{ part: 1, duration: 78 },{ part: 2, duration: 78 }] },
  { id: 'depo-010', title: 'James Cooper Lead Investigator',       witness: 'James Cooper',         date: 'March 28, 2024',duration: 88,   status: 'ready',      caseNumber: 'CV-2024-002456', goals: { total: 5, covered: 4 },   tags: ['Personal Injury','Auto Accident','Investigation'],transcriptSource: 'ai-generated', videos: [{ part: 1, duration: 88 }] },
  { id: 'depo-011', title: 'Dr. Alan Foster Accident Reconstr.',   witness: 'Dr. Alan Foster',      date: 'May 5, 2024',   duration: 112,  status: 'ready',      caseNumber: 'CV-2024-002456', goals: { total: 6, covered: 6 },   tags: ['Personal Injury','Auto Accident','Expert Witness'],transcriptSource: 'verified',    videos: [{ part: 1, duration: 112 }] },
  { id: 'depo-012', title: 'Amanda Chen Chief Technical Officer',  witness: 'Amanda Chen',          date: 'May 22, 2024',  duration: 167,  status: 'ready',      caseNumber: 'CV-2024-004321', goals: { total: 11, covered: 10 }, tags: ['Corporate Litigation','IP Dispute','Technology'], transcriptSource: 'mixed',        videos: [{ part: 1, duration: 84 },{ part: 2, duration: 83 }] },
  { id: 'depo-013', title: 'Marcus Williams Patent Attorney',      witness: 'Marcus Williams',      date: 'April 8, 2024', duration: 145,  status: 'ready',      caseNumber: 'CV-2024-004321', goals: { total: 8, covered: 7 },   tags: ['Corporate Litigation','IP Dispute','Patents'],    transcriptSource: 'verified',     videos: [{ part: 1, duration: 145 }] },
];

// Sarah Chen — full detail data used by DepositionDetail
window.MOCK_DETAIL = {
  summary: 'Sarah Chen, Senior Project Manager at TechCorp, was deposed regarding alleged contract violations and employment disputes. Witness provided detailed background and a timeline of events on June 3rd. Notable behavioral patterns: confidence during background questions, defensiveness when pressed on contract details, with multiple "I don\'t recall" responses. Sentiment analysis revealed significant shifts during the 2PM meeting and contract terms — likely critical areas for further investigation.',
  flaggedItems: [
    { id: 'flag-001', type: 'evasive',         timestamp: 152, description: 'Multiple "I don\'t recall" responses regarding 2PM meeting details',     severity: 'high' },
    { id: 'flag-002', type: 'defensive',       timestamp: 330, description: 'Crossed arms and sharp tone when discussing contract terms',            severity: 'high' },
    { id: 'flag-003', type: 'emotional-spike', timestamp: 335, description: 'Significant anger spike during contract discussion',                    severity: 'medium' },
    { id: 'flag-004', type: 'evasive',         timestamp: 340, description: 'Avoided direct answer about contract review process',                  severity: 'medium' },
    { id: 'flag-005', type: 'contradictory',   timestamp: 365, description: 'Timeline discrepancy with earlier statement about June 3rd meeting',   severity: 'high' },
    { id: 'flag-006', type: 'context-needed',  timestamp: 158, description: '3-second pause before answering question about meeting attendees',     severity: 'low' },
    { id: 'flag-007', type: 'defensive',       timestamp: 325, description: 'Leaning back, closed posture when contract details mentioned',         severity: 'medium' },
  ],
  goals: [
    { id: 'g1', title: 'Establish timeline of events on June 3rd', covered: true, notes: 'Well covered — witness provided detailed account', citations: [
      { timestamp: 125, page: 3, line: 15, quote: 'Can you describe your activities on June 3rd, 2024?' },
      { timestamp: 130, page: 3, line: 16, quote: 'I arrived at the office around 9 AM. I had a team standup at 9:30, then worked on the quarterly report until lunch.' },
    ]},
    { id: 'g2', title: 'Verify witness presence at 2PM meeting', covered: true, notes: 'Confirmed but showed signs of nervousness', citations: [
      { timestamp: 145, page: 3, line: 18, quote: 'And what happened after lunch? Were you present at the 2 PM meeting?' },
      { timestamp: 152, page: 3, line: 19, quote: 'Um... yes, I was there. The meeting started a bit late, around 2:15.' },
    ]},
    { id: 'g3', title: 'Determine knowledge of contract terms', covered: true, notes: 'Claimed limited knowledge — evasive responses', citations: [
      { timestamp: 320, page: 8, line: 5,  quote: 'Were you aware of the non-compete clause in Section 7 of the contract?' },
      { timestamp: 325, page: 8, line: 6,  quote: "I... I don't recall the specific details of Section 7." },
      { timestamp: 337, page: 8, line: 9,  quote: "Yes, but I signed many documents that day. I can't be expected to remember every detail." },
    ]},
    { id: 'g4', title: 'Obtain admission regarding email correspondence', covered: false, notes: 'Not addressed — schedule follow-up', citations: [] },
  ],
  topics: [
    { id: 't1', title: 'Background & Identification', summary: 'Witness identified herself as Sarah Chen, Senior Project Manager at TechCorp since January 2023.', segments: [
      { id: 's1', speaker: 'Attorney', text: 'Please state your full name for the record.', timestamp: 15, page: 1, line: 1, sentiment: 'neutral', source: 'verified' },
      { id: 's2', speaker: 'Witness',  text: 'Sarah Chen.',                                  timestamp: 18, page: 1, line: 2, sentiment: 'neutral', source: 'verified', cues: [{ type: 'confident', description: 'Clear, steady voice' }] },
    ]},
    { id: 't2', title: 'Events of June 3rd, 2024', summary: 'Detailed timeline. Initially confident, then nervous when questioned about afternoon timeline. Notable pause before 2PM meeting.', segments: [
      { id: 's3', speaker: 'Attorney', text: 'Can you describe your activities on June 3rd, 2024?',                                                                  timestamp: 125, page: 3, line: 15, sentiment: 'neutral',  source: 'verified' },
      { id: 's4', speaker: 'Witness',  text: 'I arrived at the office around 9 AM. I had a team standup at 9:30, then worked on the quarterly report until lunch.', timestamp: 130, page: 3, line: 16, sentiment: 'neutral',  source: 'verified',     cues: [{ type: 'confident', description: 'Maintained eye contact' }] },
      { id: 's5', speaker: 'Attorney', text: 'And what happened after lunch? Were you present at the 2 PM meeting?',                                                  timestamp: 145, page: 3, line: 18, sentiment: 'neutral',  source: 'ai-generated' },
      { id: 's6', speaker: 'Witness',  text: 'Um... yes, I was there. The meeting started a bit late, around 2:15.',                                                  timestamp: 152, page: 3, line: 19, sentiment: 'negative', source: 'ai-generated', cues: [{ type: 'pause', description: '3-second pause before answering' }, { type: 'nervous', description: 'Shifted in seat, avoided eye contact' }] },
    ]},
    { id: 't3', title: 'Knowledge of Contract Terms', summary: 'Claimed limited knowledge of specific contract clauses. Defensive when pressed on financial provisions.', segments: [
      { id: 's7',  speaker: 'Attorney', text: 'Were you aware of the non-compete clause in Section 7 of the contract?',                       timestamp: 320, page: 8, line: 5, sentiment: 'neutral',  source: 'verified' },
      { id: 's8',  speaker: 'Witness',  text: "I... I don't recall the specific details of Section 7.",                                       timestamp: 325, page: 8, line: 6, sentiment: 'negative', source: 'ai-generated', cues: [{ type: 'stutter', description: 'Hesitation at start of response' }, { type: 'defensive', description: 'Arms crossed, tone became sharp' }] },
      { id: 's9',  speaker: 'Attorney', text: 'But you signed the contract, correct?',                                                        timestamp: 332, page: 8, line: 8, sentiment: 'neutral',  source: 'verified' },
      { id: 's10', speaker: 'Witness',  text: "Yes, but I signed many documents that day. I can't be expected to remember every detail.",     timestamp: 337, page: 8, line: 9, sentiment: 'negative', source: 'ai-generated', cues: [{ type: 'defensive', description: 'Raised voice, rapid speech' }] },
    ]},
    { id: 't4', title: 'Financial Disclosures', summary: 'Specific figures for base salary, vague about bonus structure.', segments: [
      { id: 's11', speaker: 'Attorney', text: 'What was your annual compensation in 2024?', timestamp: 445, page: 12, line: 3, sentiment: 'neutral', source: 'verified' },
      { id: 's12', speaker: 'Witness',  text: 'My base salary was $185,000.',               timestamp: 450, page: 12, line: 4, sentiment: 'neutral', source: 'verified', cues: [{ type: 'confident', description: 'Direct answer, no hesitation' }] },
    ]},
  ],
  sentiment: [
    { t: 0,   v: 0.2,  label: 'Introduction' },
    { t: 60,  v: 0.3,  label: 'Background' },
    { t: 120, v: 0.1,  label: 'June 3rd Events' },
    { t: 150, v: -0.3, label: '2PM Meeting' },
    { t: 180, v: 0,    label: '' },
    { t: 240, v: 0.2,  label: '' },
    { t: 300, v: -0.1, label: 'Contract Terms' },
    { t: 330, v: -0.6, label: 'Defensive' },
    { t: 360, v: -0.4, label: '' },
    { t: 420, v: 0.1,  label: 'Financial' },
    { t: 480, v: 0.3,  label: 'Closing' },
  ],
  timeline: [
    {
      id: 'ev1', date: '2023-01-15', time: '10:00 AM', category: 'document',
      title: 'Employment Contract Signed',
      description: 'Sarah Chen signed employment agreement with TechCorp as Senior Project Manager. Contract includes Section 7 non-compete clause.',
      source: 'Exhibit A — Employment Contract',
      contradiction: false,
      references: [
        { label: 'Exhibit A', desc: 'Employment Contract, 14 pages' },
      ],
      mentionedBy: [
        { speaker: 'Attorney', timestamp: 310, page: 8, line: 4, quote: 'You signed this contract on January 15th, 2023, correct?' },
        { speaker: 'Witness',  timestamp: 315, page: 8, line: 5, quote: 'Yes, I signed it. I was excited to start.' },
      ],
    },
    {
      id: 'ev2', date: '2024-01-01', time: null, category: 'document',
      title: '2024 Compensation Amendment',
      description: 'Annual compensation set at $185,000 base salary. Amendment appended to original contract.',
      source: 'Exhibit D — Compensation Amendment',
      contradiction: false,
      references: [
        { label: 'Exhibit D', desc: 'Compensation Amendment, signed Jan 3 2024' },
      ],
      mentionedBy: [
        { speaker: 'Attorney', timestamp: 400, page: 10, line: 2, quote: 'Your 2024 compensation was $185,000 per the amendment?' },
        { speaker: 'Witness',  timestamp: 405, page: 10, line: 3, quote: 'That\'s correct.' },
      ],
    },
    {
      id: 'ev3', date: '2024-06-03', time: '9:00 AM', category: 'action',
      title: 'Witness Arrives at Office',
      description: 'Witness testified she arrived at the office "around 9 AM" and went directly to her desk.',
      source: 'Testimony — p.3 l.16',
      transcriptTimestamp: 130,
      contradiction: true,
      contradictionDetails: 'Badge scan log (Exhibit E) records key-card entry at 9:03 AM. Witness later stated she arrived "closer to 9:15." Testimony is internally inconsistent and conflicts with the access record.',
      contradictionRef: 'Exhibit E — Badge Scan Log',
      references: [
        { label: 'Exhibit E', desc: 'Badge Scan Log, June 3 2024' },
      ],
      mentionedBy: [
        { speaker: 'Attorney', timestamp: 125, page: 3, line: 15, quote: 'Can you describe your activities on June 3rd, 2024?' },
        { speaker: 'Witness',  timestamp: 130, page: 3, line: 16, quote: 'I arrived at the office around 9 AM.' },
      ],
    },
    {
      id: 'ev4', date: '2024-06-03', time: '9:30 AM', category: 'meeting',
      title: 'Team Standup',
      description: 'Regular weekly standup with the project team. Witness confirmed attendance.',
      source: 'Testimony — p.3 l.17',
      transcriptTimestamp: 140,
      contradiction: false,
      references: [],
      mentionedBy: [
        { speaker: 'Witness', timestamp: 140, page: 3, line: 17, quote: 'I had a team standup at 9:30, then worked on the quarterly report until lunch.' },
      ],
    },
    {
      id: 'ev5', date: '2024-06-03', time: '9:45 AM – 12:00 PM', category: 'action',
      title: 'Q2 Report Work Session',
      description: 'Witness worked on the quarterly financial report until lunch. No other attendees present.',
      source: 'Testimony — p.3 l.18',
      transcriptTimestamp: 145,
      contradiction: false,
      references: [],
      mentionedBy: [
        { speaker: 'Witness', timestamp: 145, page: 3, line: 18, quote: 'I worked on the quarterly report until lunch, around noon.' },
      ],
    },
    {
      id: 'ev6', date: '2024-06-03', time: '2:00 PM', category: 'meeting',
      title: '2PM Meeting — Scheduled Start',
      description: 'Project status meeting scheduled for 2:00 PM per calendar invite sent June 1st.',
      source: 'Exhibit B — Calendar Invite',
      contradiction: true,
      contradictionDetails: 'Witness testified the meeting "started a bit late, around 2:15." Attendance logs (Exhibit C) confirm all participants joined at 2:02 PM. Witness was 13 minutes off — consistent across both statements but conflicts with records.',
      contradictionRef: 'Exhibit B & C — Calendar + Attendance Log',
      transcriptTimestamp: 152,
      references: [
        { label: 'Exhibit B', desc: 'Calendar Invite, sent June 1 2024' },
        { label: 'Exhibit C', desc: 'Meeting Attendance Log' },
      ],
      mentionedBy: [
        { speaker: 'Attorney', timestamp: 145, page: 3, line: 18, quote: 'And what happened after lunch? Were you present at the 2 PM meeting?' },
        { speaker: 'Witness',  timestamp: 152, page: 3, line: 19, quote: 'The meeting started a bit late, around 2:15.' },
      ],
    },
    {
      id: 'ev7', date: '2024-06-03', time: '4:30 PM', category: 'action',
      title: 'Contract Review Request Sent',
      description: 'Internal email shows witness forwarded Section 7 of the employment contract to outside counsel for review.',
      source: 'Exhibit F — Internal Email',
      contradiction: true,
      contradictionDetails: 'Witness claimed she was "not familiar with the specifics of Section 7." Exhibit F shows she initiated a legal review of that exact clause on the same day as the disputed meeting.',
      contradictionRef: 'Exhibit F — Internal Email Chain',
      transcriptTimestamp: 325,
      references: [
        { label: 'Exhibit A', desc: 'Employment Contract, Section 7' },
        { label: 'Exhibit F', desc: 'Internal Email Chain, June 3 2024' },
      ],
      mentionedBy: [
        { speaker: 'Attorney', timestamp: 320, page: 8, line: 5, quote: 'Are you familiar with the non-compete clause in Section 7 of your contract?' },
        { speaker: 'Witness',  timestamp: 325, page: 8, line: 6, quote: 'I... I don\'t recall the specific details of Section 7.' },
      ],
    },
  ],
  contradictions: [
    {
      id: 'ctr-001', type: 'record', category: 'Exhibit in the Room', status: 'verified', severity: 'high',
      title: 'Contract Section 7 — Claimed Ignorance vs. Signed Document',
      stmtA: { label: 'Testimony', quote: "I... I don't recall the specific details of Section 7.", timestamp: 325, page: 8, line: 6 },
      stmtB: { label: 'Employment Contract (Exh. A)', quote: 'Witness signature appears on page 12 directly below the non-compete clause in Section 7, dated January 15, 2023.' },
      why: 'Witness claimed limited knowledge of Section 7 while her signature appears on the same page directly below the clause. The document was retrieved from her own personnel file.',
      crosslinks: ['Timeline · Contract Signed', 'Flagged · Flag #002'],
    },
    {
      id: 'ctr-002', type: 'self', category: 'Recall Inconsistency', status: 'verified', severity: 'high',
      title: 'Arrival Time — June 3rd Timeline',
      stmtA: { label: 'p. 3, early testimony', quote: 'I arrived at the office around 9 AM. I had a team standup at 9:30...', timestamp: 130, page: 3, line: 16 },
      stmtB: { label: 'p. 9, later testimony', quote: "I remember now I was actually running late that day — I think I came in closer to 9:15.", timestamp: 365, page: 9, line: 4 },
      why: 'Witness stated a precise 9 AM arrival time early in the deposition, then revised this to "closer to 9:15" during cross. Badge records (Exh. E) show entry at 9:03 AM.',
      crosslinks: ['Timeline · Arrived at Office', 'Exhibits · Exh. E'],
    },
    {
      id: 'ctr-003', type: 'record', category: 'Meeting Time', status: 'probable', severity: 'medium',
      title: '2PM Meeting — Start Time Discrepancy',
      stmtA: { label: 'Testimony', quote: 'The meeting started a bit late, around 2:15.', timestamp: 152, page: 3, line: 19 },
      stmtB: { label: 'Calendar Records (Exh. B)', quote: 'Digital calendar and join-time logs confirm all attendees entered the meeting room at 2:02 PM.' },
      why: 'Witness testified the meeting started at 2:15 PM but calendar and attendance records show a 2:02 PM start. A 13-minute discrepancy may affect timeline claims.',
      crosslinks: ['Timeline · 2PM Meeting', 'Exhibits · Exh. B'],
    },
  ],
  exhibits: [
    {
      id: 'exh-001', label: 'Exh. A', title: 'Employment Contract — Full Agreement', timestamp: 320,
      category: 'Contract', contradictions: 2, references: 7,
      desc: 'Original employment agreement including non-compete clause in Section 7. Witness signature present on page 12 directly below the clause in question.',
    },
    {
      id: 'exh-002', label: 'Exh. B', title: 'Calendar Records — June 3, 2024', timestamp: 145,
      category: 'Calendar', contradictions: 1, references: 4,
      desc: 'Digital calendar showing 2PM meeting invitation, confirmations, and join-time logs for all attendees. Conflicts with witness testimony on start time.',
    },
    {
      id: 'exh-003', label: 'Exh. C', title: 'Q2 2024 Project Report (Draft)', timestamp: 130,
      category: 'Document', contradictions: 0, references: 3,
      desc: 'The quarterly report witness claims to have worked on from 9:45 AM to noon on June 3rd. Version history shows last edit at 11:47 AM.',
    },
    {
      id: 'exh-004', label: 'Exh. D', title: 'Email Thread — Contract Review', timestamp: 335,
      category: 'Email', contradictions: 1, references: 5,
      desc: 'Internal email thread from January 2023 showing witness acknowledged receipt of contract amendment and forwarded it to legal with the note "reviewed, looks fine."',
    },
    {
      id: 'exh-005', label: 'Exh. E', title: 'Office Badge Access Log — June 3', timestamp: 365,
      category: 'Records', contradictions: 1, references: 2,
      desc: 'Electronic badge scan records showing witness entry at 9:03 AM on June 3rd, 2024. Contradicts revised testimony claiming arrival "closer to 9:15."',
    },
  ],
};
