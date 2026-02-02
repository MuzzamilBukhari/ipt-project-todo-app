import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

export default function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onViewNotes,
  formatDate,
}) {
  return (
    <div
      className="border border-slate-200 rounded p-3 sm:p-4 bg-white hover:shadow-xl transition-all ease-in-out drop-shadow cursor-pointer"
      onClick={onViewNotes}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h6 className="font-medium text-sm sm:text-base truncate">{title}</h6>
          <span className="text-xs sm:text-sm text-slate-500">
            {formatDate(date)}
          </span>
        </div>
        <MdOutlinePushPin
          className={`text-lg sm:text-xl cursor-pointer hover:text-blue-600 shrink-0 ml-2 ${isPinned ? "text-blue-600" : "text-slate-400"}`}
          onClick={(e) => {
            e.stopPropagation();
            onPinNote();
          }}
        />
      </div>

      <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3">
        {content?.length > 60 ? `${content.slice(0, 60)}....` : content}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500 flex-1 min-w-0 flex flex-wrap gap-1">
          {tags.map((tag, index) => {
            return (
              <span key={index} className="inline-block">{`#${tag}`}</span>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
          <MdCreate
            className="icon-btn text-base sm:text-lg text-slate-400 hover:text-green-600"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          />
          <MdDelete
            className="icon-btn text-base sm:text-lg text-slate-400 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      </div>
    </div>
  );
}
