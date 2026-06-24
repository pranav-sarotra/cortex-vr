# Criterion 3 — UI/UX Development Methodology Justification

**Module:** ITS69004 Human Computer Interaction (WBL)  
**Student:** Pranav Sarotra  
**Application:** CORTEX VR — A Cognitive VR Experience Platform

---

## 1.0 Chosen Methodology: Design Thinking (Stanford d.school Model)

The UI/UX development of CORTEX VR follows the **Design Thinking** framework as originally formalised by the Hasso Plattner Institute of Design at Stanford University (commonly referred to as the Stanford d.school). This methodology was selected over alternatives such as User-Centred Design (UCD), Lean UX, and Agile UX for specific reasons tied to the nature of VR application development, which are detailed in this document.

---

## 2.0 Understanding Design Thinking

Design Thinking is a human-centred, iterative problem-solving framework that prioritises deep empathy with users, creative ideation unconstrained by existing assumptions, rapid prototyping, and continuous testing. Unlike linear development models that move sequentially from requirements to implementation, Design Thinking encourages revisiting earlier stages as new insights emerge, making it particularly well-suited to domains where user needs are complex, evolving, or not yet fully understood.

The framework consists of five interconnected stages: Empathize, Define, Ideate, Prototype, and Test. These stages are not strictly sequential — teams frequently loop between stages as understanding deepens. This non-linear quality is a core strength when designing for an emerging medium like VR, where established design patterns are sparse and user expectations are still forming.

---

## 3.0 Application of the Five Stages to CORTEX VR

### 3.1 Empathize — Understanding Users in Context

The Empathize stage involves immersing the design team in the users' world to understand their experiences, motivations, pain points, and latent needs — needs that users themselves may not be able to articulate.

**Application to CORTEX VR:** For a platform that spans empathy training (EmpathOS), biometric wellness (BioSync), cognitive learning (Mnemo), heritage exploration (ChronoLens), and cross-modal creativity (SynAesthesia), the user base is exceptionally diverse. Empathy research for CORTEX VR involved three key activities:

- **Contextual inquiry** with Malaysian university students to understand their study habits, pain points with memorisation, and attitudes toward VR technology.
- **Expert interviews** with accessibility advocates to ensure EmpathOS representations of disability are accurate, respectful, and genuinely educational rather than exploitative.
- **Observational research** into how people in Malaysia and Southeast Asia currently engage with heritage sites, identifying the disconnect between physical visits and deep historical understanding.

This stage directly shaped which features were prioritised and how they were framed — for example, the decision to include a post-session reflective prompt in EmpathOS emerged from accessibility expert feedback that embodiment without reflection can reinforce stereotypes rather than build empathy.

### 3.2 Define — Synthesising Insights into Problem Statements

The Define stage transforms raw empathy research into actionable problem statements (often called "Point of View" or POV statements) that focus the design effort.

**Application to CORTEX VR:** Each of the five features was anchored to a specific problem statement derived from the Empathize stage:

| Feature | Problem Statement |
|---------|------------------|
| EmpathOS | "People who have never experienced physical disability lack the embodied understanding needed to design inclusive spaces and systems." |
| BioSync | "Users in high-stress environments cannot benefit from therapeutic VR when the VR itself does not adapt to their current physiological state." |
| Mnemo | "Students invest significant study time with diminishing returns because traditional methods do not leverage the brain's strongest memory system — spatial recall." |
| ChronoLens | "Young Malaysians feel disconnected from their national heritage because history is presented as static text and images rather than immersive lived experience." |
| SynAesthesia | "People without formal artistic training are excluded from creative expression because every creative tool requires modality-specific skill." |

These problem statements ensured that every design decision throughout the prototype could be traced back to a genuine human need, preventing feature creep and maintaining focus on impact.

### 3.3 Ideate — Generating Creative Solutions

The Ideate stage encourages divergent thinking — generating a wide range of possible solutions without premature judgement, then converging on the most promising concepts.

**Application to CORTEX VR:** Ideation for CORTEX VR deliberately avoided incremental improvements to existing VR platforms. Instead, the design team used structured brainstorming techniques including:

- **"How Might We" questions** — reframing problem statements as open-ended design challenges (e.g., "How might we make someone genuinely understand wheelchair accessibility challenges in under 10 minutes?")
- **Analogous inspiration** — drawing from fields outside VR, such as neuroscience (Method of Loci for Mnemo), clinical biofeedback therapy (for BioSync), and the neurological condition of synesthesia (for the SynAesthesia creative engine)
- **Worst-possible-idea exercise** — deliberately generating bad ideas to break cognitive fixation and reveal unexpected angles

Over 30 initial concepts were generated and then evaluated against three convergence criteria: (1) Can this only work in VR? (if it could work as a mobile app, it was deprioritised), (2) Is there scientific or theoretical evidence supporting its efficacy? and (3) Does it address a gap not served by any existing platform? The five features that survived this convergence process form the CORTEX VR feature set.

### 3.4 Prototype — Building to Think

The Prototype stage is not about building a finished product — it is about creating tangible artefacts that can be experienced, critiqued, and iterated upon. The Stanford d.school emphasises prototyping as a thinking tool: "If a picture is worth a thousand words, a prototype is worth a thousand meetings."

**Application to CORTEX VR:** The CORTEX VR prototype was developed as a high-fidelity interactive web application rather than static mockups. This decision was deliberate — the dynamic, interactive nature of VR means that static wireframes fail to communicate the experience of navigation, spatial transitions, and real-time adaptation. The prototype includes:

- **Seven fully designed screens** (Splash/Onboarding, Home Dashboard, EmpathOS, BioSync, Mnemo, ChronoLens, SynAesthesia) with distinct visual identities for each feature
- **Interactive navigation** via a single-page application architecture with smooth screen transitions that simulate the fluidity of moving between VR modules
- **Live data simulation** — the BioSync screen features real-time fluctuating biometric values (heart rate, stress, breathing, focus) to demonstrate how the adaptive environment concept would function
- **Audio visualiser animation** on the SynAesthesia screen to convey cross-modal mapping
- **Floating knowledge nodes** on the Mnemo screen to represent spatial memory anchoring
- **A "Neural Cosmos" design system** using glassmorphism, animated gradient meshes, particle effects, and 3D card tilt interactions to evoke the sensation of being inside a VR interface even within a 2D web prototype

The prototype prioritised "fidelity of experience" — communicating how it feels to use CORTEX VR — over "fidelity of features" — which would require actual VR headset development.

### 3.5 Test — Learning from Users

The Test stage involves putting the prototype in front of real users, observing their interactions, gathering feedback, and identifying assumptions that were wrong.

**Application to CORTEX VR:** The planned testing approach includes:

- **Heuristic evaluation** using Jakob Nielsen's 10 usability heuristics, conducted by the design team to identify fundamental usability issues before user testing
- **Think-aloud protocol testing** with five target users (university students in Malaysia), where participants verbalise their thoughts while navigating the prototype
- **Task-based usability testing** with specific scenarios (e.g., "You want to study for a chemistry exam — find and use the appropriate feature")
- **Post-task questionnaires** using the System Usability Scale (SUS) to quantify perceived usability

Findings from testing would feed directly back into the Empathize and Define stages, triggering a new iteration cycle — this is the non-linear quality that distinguishes Design Thinking from waterfall methodologies.

---

## 4.0 Justification: Why Design Thinking Over Alternatives

### 4.1 Why Not User-Centred Design (UCD)?

User-Centred Design, as formalised in ISO 9241-210, shares Design Thinking's emphasis on understanding users. However, UCD is primarily a process standard — it prescribes that design should involve users but provides less guidance on creative problem framing. For CORTEX VR, where the challenge was not simply "making an interface usable" but "imagining entirely new interaction paradigms for VR cognition," Design Thinking's emphasis on reframing problems and lateral ideation was essential. UCD would likely have produced an incrementally better version of existing VR platforms rather than the fundamentally different features that CORTEX VR proposes.

### 4.2 Why Not Lean UX?

Lean UX focuses on minimising waste through rapid hypothesis-outcome cycles and Minimum Viable Products (MVPs). While efficient for startups iterating on established product categories, Lean UX presupposes that you can test a hypothesis quickly with real users. For a VR platform exploring novel cognitive features like biometric-adaptive environments and synesthetic creative tools, the hypothesis space is too broad and the cost of building even a minimal VR experience is too high for rapid Lean cycles. Design Thinking's prototyping stage — which explicitly values low-fidelity artefacts for learning — was more appropriate for this exploratory phase.

### 4.3 Why Design Thinking Is Ideal for VR

VR development sits at the intersection of multiple disciplines: computer science, psychology, neuroscience, spatial design, and interaction design. Design Thinking's inherently multidisciplinary nature — originally developed as a methodology for complex, interdisciplinary challenges — aligns naturally with VR's interdisciplinary demands. The methodology's tolerance for ambiguity, its emphasis on reframing problems before solving them, and its integration of empathy research with creative ideation make it the strongest fit for a platform like CORTEX VR that pushes the boundaries of what VR can be.

---

## 5.0 Summary

Design Thinking, as practised by the Stanford d.school, provided the methodological foundation for CORTEX VR's development. The five stages — Empathize, Define, Ideate, Prototype, and Test — were applied rigorously to ensure that every feature is grounded in genuine user needs, every design decision is traceable to a defined problem, and the prototype communicates not just what CORTEX VR looks like, but how it feels to use. The methodology's non-linear, iterative structure is particularly well-suited to VR — an emerging medium where user expectations are still forming and the most impactful applications have not yet been imagined.

---

*CORTEX VR — Redefine Perception. Experience Beyond Reality.*  
*By Pranav Sarotra · ITS69004 Human Computer Interaction*
