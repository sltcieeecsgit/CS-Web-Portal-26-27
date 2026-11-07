import React, { useState, useMemo } from 'react';
import {
  Users,
  Award
} from 'lucide-react';
import membersData from '../data/members.json';
import MemberCard from '../components/MemberCard';
import QRModal from '../components/QRModal';
import SocietySocialBar from '../components/SocietySocialBar';

export default function HomePage() {
  const [modalMember, setModalMember] = useState(null);

  // Excom and Subcom groups
  const excomMembers = useMemo(() => {
    return membersData.filter((m) => m.committeeType === 'excom');
  }, []);

  const subcomMembers = useMemo(() => {
    return membersData.filter((m) => m.committeeType === 'subcom');
  }, []);

  return (
    <div className="relative pb-24 overflow-hidden">
      {/* Warm Yellow and White ambient background glow */}
      <div className="ambient-glow w-[600px] h-[600px] bg-yellow-300/40 top-0 left-1/2 -translate-x-1/2 -z-10" />
      <div className="ambient-glow w-[500px] h-[500px] bg-amber-400/20 top-72 right-10 -z-10" />

      {/* Header: Society Name & Team Group Photo */}
      <header className="pt-10 pb-12 sm:pt-14 sm:pb-14 text-center border-b border-amber-200/60 bg-gradient-to-b from-amber-100/40 via-white to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Society Name */}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-2">
            IEEE Computer <span className="text-amber-500 drop-shadow-sm">Society</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-semibold italic mb-2">
            Student Branch Chapter of SLTC
          </p>

          {/* Official Digital Profile Directory Heading */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs sm:text-sm font-black tracking-wider uppercase mb-8 shadow-sm">
            Official Digital Profile Directory
          </div>

          {/* Official Team Group Photo Banner */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-2xl ring-4 ring-amber-300/60 border border-amber-200 group bg-white">
            <img
              src="/img/team-group.jpg"
              alt="IEEE Computer Society Student Branch Chapter of SLTC - Team Members"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none" />
          </div>

          {/* Society Social Media Links Under Hero Banner */}
          <div className="mt-8 pt-1 flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider mb-3.5">
              Connect With US
            </p>
            <SocietySocialBar />
          </div>
        </div>
      </header>

      {/* Main Content: Two Sections (Excom & Subcom) */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="space-y-12 sm:space-y-16">
          {/* Section 1: Executive Committee */}
          {excomMembers.length > 0 && (
            <section id="excom" className="scroll-mt-24">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-100 border border-amber-300 text-amber-900 shadow-sm">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider">
                    Executive Committee
                  </h2>
                </div>
              </div>

              <div className="member-cards-container">
                {excomMembers.map((member) => (
                  <div key={member.id} className="member-card-wrapper">
                    <MemberCard
                      member={member}
                      onOpenQRModal={(m) => setModalMember(m)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 2: Sub Committee */}
          {subcomMembers.length > 0 && (
            <section id="subcom" className="scroll-mt-24">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-yellow-100 border border-yellow-300 text-yellow-900 shadow-sm">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider">
                    Sub Committee
                  </h2>
                </div>
              </div>

              <div className="member-cards-container">
                {subcomMembers.map((member) => (
                  <div key={member.id} className="member-card-wrapper">
                    <MemberCard
                      member={member}
                      onOpenQRModal={(m) => setModalMember(m)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* QR Code Modal for Preview & Download */}
      <QRModal
        member={modalMember}
        isOpen={Boolean(modalMember)}
        onClose={() => setModalMember(null)}
      />
    </div>
  );
}
