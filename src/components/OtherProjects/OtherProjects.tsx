import { Github } from 'lucide-react';
import { Button } from '../ui';

function OtherProjects() {
  return (
    <div className="px-4 py-8 text-center bg-surface0/30 rounded-xl border border-surface0">
      <h3 className="text-xl md:text-2xl font-bold text-subtext0 mb-4">Looking for more?</h3>
      <p className="text-subtext0 mb-6 max-w-2xl mx-auto">
        These are just the highlights. I have dozens of other projects ranging from algorithms and data structures to game prototypes and creative coding experiments on my GitHub.
      </p>
      <div className="flex justify-center">
        <Button variant="outline" href="https://github.com/SpasZahariev/" target="_blank" className="flex items-center gap-2">
          <Github size={18} />
          <span>View all projects on GitHub</span>
        </Button>
      </div>
    </div>
  );
}

export default OtherProjects;
