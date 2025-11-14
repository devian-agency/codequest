import {motion} from "framer-motion"
import { CalendarDays, Clock } from "lucide-react";


const Loader = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 1000, damping: 17, mass: 2 }}
      className="bg-card rounded-border p-4 hover:bg-card-hover cursor-pointer block"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white"></h2>
        <span className="text-sm text-accent"></span>
      </div>
      <div className="flex justify-between items-end mt-4">
        <div>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
              <Clock size={16} />
              <span>
                 </span>
            </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
            <span><CalendarDays size={16} /></span>
            <span>
              
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
            
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4 text-sm">
          <span
            className="text-blue-400 hover:underline"
          >
            Open
          </span>
          <span
            className="text-green-400 hover:underline"
          >
            Add to Calendar
          </span>
        </div>
      </div>
    </motion.div>
  );
};