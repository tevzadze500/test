import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export const reactionFaqs = [
  {
    question: 'What is the average human reaction time in milliseconds?',
    answer:
      'The average human reaction time to a visual signal is around 250 ms. Auditory reactions are slightly faster (~170 ms), and trained gamers or athletes often dip below 200 ms. The physical floor is roughly 100–120 ms — the time it takes nerve signals to travel from eye to hand.',
  },
  {
    question: 'How is reaction time measured on this test?',
    answer:
      'A timer starts the instant the screen turns green and stops the moment you click or tap. It uses your browser’s high-resolution clock to record the gap in milliseconds. Because single attempts vary, your best and average scores across several tries give the truest picture of your reaction speed.',
  },
  {
    question: 'Why does my reaction time vary between attempts?',
    answer:
      'Focus, fatigue, anticipation, caffeine, and even the time of day all cause natural swings from one attempt to the next. That is completely normal, which is why the test tracks both your best time and your running average.',
  },
  {
    question: 'Is 200 ms a good reaction time?',
    answer:
      'Yes — 200 ms is a very good reaction time. It is around competitive-gamer level and noticeably faster than the ~250 ms average adult. Consistently scoring under 200 ms puts you in the elite range for a visual reaction test.',
  },
];

const ReactionInfoSection = () => {
  return (
    <div className="space-y-8">
      {/* What is a reaction time test */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-4">What Is a Reaction Time Test?</h2>
        <p className="text-dark-300 text-lg leading-relaxed">
          A <strong className="text-white">reaction time test</strong> measures how fast you respond to a stimulus — the split-second gap between a signal appearing and your body reacting to it. This is a <strong className="text-white">visual reaction time test</strong>: you wait for the screen to turn green, then click or tap as fast as you can. Your score is shown in <strong className="text-white">milliseconds (ms)</strong> — thousandths of a second. That single number captures a whole chain of events: your eyes detect the change, your brain processes it, and your muscles fire. It is the same reflex that lets you slam the brakes, return a serve, or land a headshot. Run several attempts — your best and average reveal your true reaction speed.
        </p>
      </section>

      {/* Average human reaction time + benchmark table */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-4">What Is the Average Human Reaction Time?</h2>
        <p className="text-dark-300 leading-relaxed mb-5">
          The <strong className="text-white">average human reaction time</strong> to a visual signal is roughly <strong className="text-white">250 milliseconds</strong>. Because it is a physiological limit, you cannot beat about 100–120 ms — that floor is simply how long it takes signals to travel from eye to hand. Here is how your score compares:
        </p>
        <div className="overflow-x-auto rounded-xl border border-dark-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-dark-900/60 text-dark-400">
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Your time</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Level</th>
                <th className="py-3 px-4 font-semibold">Who scores here</th>
              </tr>
            </thead>
            <tbody className="text-dark-300">
              <tr className="border-t border-dark-800">
                <td className="py-3 px-4 font-bold text-green-400 whitespace-nowrap">&lt; 200 ms</td>
                <td className="py-3 px-4 whitespace-nowrap">Fast / Elite</td>
                <td className="py-3 px-4">Pro gamers and athletes in peak condition</td>
              </tr>
              <tr className="border-t border-dark-800">
                <td className="py-3 px-4 font-bold text-blue-400 whitespace-nowrap">200–250 ms</td>
                <td className="py-3 px-4 whitespace-nowrap">Above Average</td>
                <td className="py-3 px-4">Sharp reflexes — regular gamers and active adults</td>
              </tr>
              <tr className="border-t border-dark-800">
                <td className="py-3 px-4 font-bold text-yellow-400 whitespace-nowrap">250–300 ms</td>
                <td className="py-3 px-4 whitespace-nowrap">Average</td>
                <td className="py-3 px-4">The typical healthy adult range</td>
              </tr>
              <tr className="border-t border-dark-800">
                <td className="py-3 px-4 font-bold text-orange-400 whitespace-nowrap">&gt; 300 ms</td>
                <td className="py-3 px-4 whitespace-nowrap">Below Average</td>
                <td className="py-3 px-4">Tired, distracted, or just warming up</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Factors that influence reflexes */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-4">Factors That Influence Your Reflexes</h2>
        <p className="text-dark-300 leading-relaxed mb-4">
          Your reaction time is not fixed — it swings with your state and your setup:
        </p>
        <ul className="space-y-3 text-dark-300">
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Age</strong> — reflexes peak in your late teens and twenties and gradually slow after about 30, though regular practice offsets much of the decline.</span></li>
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Fatigue &amp; sleep</strong> — a tired brain can add 30–50 ms instantly, and a single bad night measurably dulls your edge.</span></li>
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Caffeine</strong> — a moderate dose can shave a few milliseconds by boosting alertness, but too much adds jitter and hurts consistency.</span></li>
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Distraction &amp; impulse control</strong> — divided attention is the biggest killer of consistency. When your brain is busy holding back an impulse instead of firing cleanly, timing suffers — exactly what our <Link to="/test/go-no-go" className="text-green-400 hover:text-green-300 underline font-medium">Go/No-Go Test</Link> measures.</span></li>
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Device &amp; display</strong> — screen latency and input lag inflate your number, which is why elite scores usually come from high-refresh setups — the same edge that counts in our <Link to="/test/f1-reaction" className="text-green-400 hover:text-green-300 underline font-medium">F1 Reaction Test</Link>.</span></li>
        </ul>
      </section>

      {/* Visual vs auditory vs tactile */}
      <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">The Difference Between Visual, Auditory, and Tactile Reflexes</h2>
        <p className="text-dark-300 leading-relaxed mb-4">
          Not all reactions are equal — the sense you react to changes the speed:
        </p>
        <ul className="space-y-3 text-dark-300">
          <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span><span><strong className="text-white">Visual (~250 ms)</strong> — the slowest of the three, because light has to be processed through the visual cortex. It is what this test measures.</span></li>
          <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span><span><strong className="text-white">Auditory (~170 ms)</strong> — faster, since sound reaches the brain through a shorter neural path. That is why sprint races start with a gun, not a light.</span></li>
          <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">•</span><span><strong className="text-white">Tactile / touch (~150 ms)</strong> — usually the quickest, as touch signals travel an especially direct route to the brain.</span></li>
        </ul>
        <p className="text-dark-400 text-sm mt-4">
          This is why the stimulus matters: a "good" reaction time only makes sense relative to <em>how</em> you are being cued.
        </p>
      </section>

      {/* How to improve */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-4">How to Improve Your Everyday Reaction Speed</h2>
        <p className="text-dark-300 leading-relaxed mb-4">Reaction speed is a trainable skill. To sharpen it:</p>
        <ul className="space-y-3 text-dark-300">
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Practice deliberately</strong> — short, regular sessions build the neural pathway faster than occasional marathons.</span></li>
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Prioritise sleep</strong> — it is the single biggest lever; well-rested reflexes are consistently faster.</span></li>
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Stay active</strong> — aerobic fitness improves the brain’s processing speed and blood flow.</span></li>
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Cut distractions</strong> — a focused mind reacts faster, so single-task when it counts.</span></li>
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Train the systems around speed</strong> — reaction relies on staying alert and holding information in mind. Strengthen the cognitive side with our <Link to="/test/memory" className="text-green-400 hover:text-green-300 underline font-medium">Working Memory Test</Link>: sharper working memory and attention make your reactions far more consistent.</span></li>
          <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Warm up</strong> — your first few attempts are always your slowest, so take a practice run before you judge your score.</span></li>
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {reactionFaqs.map((faq, index) => (
            <div key={index} className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2 flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">Q:</span>
                {faq.question}
              </h3>
              <p className="text-dark-300 text-sm pl-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-orange-400 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="text-white font-semibold mb-2">Important Notice</h3>
            <p className="text-dark-300 text-sm">
              This test is designed for entertainment and educational purposes. Results may be affected by
              device performance, display latency, browser performance, and input lag. For professional
              assessment or medical purposes, please consult qualified professionals using calibrated
              equipment. This test should not be used for diagnostic purposes or as a substitute for
              professional medical advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReactionInfoSection;
