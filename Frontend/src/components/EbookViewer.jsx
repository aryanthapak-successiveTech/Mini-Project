const EbookViewer = ({ ebookUrl }) => {
  return (
    <div className="w-full h-[80vh] border rounded-lg overflow-hidden shadow-md">
      <iframe
        src={ebookUrl}
        title="Ebook Viewer"
        className="w-full h-full"
        frameBorder="0"
      />
    </div>
  );
};

export default EbookViewer;
