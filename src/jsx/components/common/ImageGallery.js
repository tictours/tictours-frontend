import React, { useState } from 'react';

export const ImageGallery = ({data=[],imageUrl='file_url'}) => {
    const [selectedImage, setSelectedImage] = useState(null);


  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const renderThumbnail = (image, index) => (
    <div key={index} className="col-4 mb-4">
      <img
        src={image?.[imageUrl]}
        alt={`Image ${index}`}
        className="img-thumbnail"
        onClick={() => handleImageClick(image?.[imageUrl])}
      />
    </div>
  );

  return (
    <div className="container mt-4">
      {selectedImage && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img src={selectedImage} alt="Selected Image" className="img-fluid" />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setSelectedImage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        {data?.map(renderThumbnail)}
      </div>
    </div>
  );
};

