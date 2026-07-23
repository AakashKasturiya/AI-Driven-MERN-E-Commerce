export const Modal = ({modalToggleHandler, copyLink, whatsappUrl, twitterUrl, facebookUrl}) =>{
    return(
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={modalToggleHandler}
              aria-label="Close"
            />

            <div className="relative bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Share this product
                </h3>
                <button type="button" onClick={modalToggleHandler}>
                  <i className="ri-close-line text-2xl text-gray-500 hover:text-gray-700"></i>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border p-2 rounded hover:bg-gray-50 transition"
                >
                  <i className="ri-whatsapp-line text-green-500 text-xl"></i>
                  <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                </a>
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border p-2 rounded hover:bg-gray-50 transition"
                >
                  <i className="ri-twitter-line text-sky-500 text-xl"></i>
                  <span className="text-sm font-medium text-gray-700">Twitter</span>
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border p-2 rounded hover:bg-gray-50 transition"
                >
                  <i className="ri-facebook-box-line text-blue-600 text-xl"></i>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  className="flex items-center gap-2 border p-2 rounded hover:bg-gray-50 transition"
                >
                  <i className="ri-file-copy-line text-purple-500 text-xl"></i>
                  <span className="text-sm font-medium text-gray-700">Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        </>
    )
}