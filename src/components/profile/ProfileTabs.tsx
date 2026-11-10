export default function ProfileTabs() {
  const tabs = [
    { id: 'posts', label: '게시물' },
    { id: 'saved', label: '저장됨' },
    { id: 'tagged', label: '태그됨' },
  ];

  return (
    <div className="flex h-[44px] justify-center gap-x-[4px] border-b-[0.5px] border-[#2b3036]">
      {tabs.map((tab) => {
        const isSelected = tab.id === 'posts';

        return (
          <div
            key={tab.id}
            className="flex h-[44px] max-w-[193px] flex-1 items-center justify-center"
          >
            <button
              type="button"
              aria-label={tab.label}
              aria-pressed={isSelected}
              className={`flex h-[44px] items-center justify-center border-b-2 px-[20px] ${
                isSelected
                  ? 'border-[#f8f9f9] text-[#f5f5f5]'
                  : 'border-transparent text-[#8e8e8e]'
              }`}
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="block"
              >
                {tab.id === 'posts' &&
                  [1, 9, 17].flatMap((y) =>
                    [3, 9.667, 16.333].map((x) => (
                      <rect
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        width="4.667"
                        height="6"
                        rx="1"
                        ry="1"
                      />
                    ))
                  )}

                {tab.id === 'saved' && (
                  <polygon
                    fill="none"
                    points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                )}

                {tab.id === 'tagged' && (
                  <>
                    <path d="M21 7.48a2 2 0 0 0-2-2h-3.046a2.002 2.002 0 0 1-1.506-.683l-1.695-1.939a1 1 0 0 0-1.506 0L9.552 4.797c-.38.434-.93.682-1.506.682H5a2 2 0 0 0-2 2V19l.01.206A2 2 0 0 0 5 21h14a2 2 0 0 0 2-2V7.48ZM23 19a4 4 0 0 1-4 4H5a4 4 0 0 1-3.995-3.794L1 19V7.48a4 4 0 0 1 4-4h3.046l1.696-1.94a3 3 0 0 1 4.516 0l1.696 1.94H19a4 4 0 0 1 4 4V19Z" />
                    <path d="M14.5 10.419a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm2 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM12 16.003c3.511 0 6.555 1.99 8.13 4.906a1 1 0 0 1-1.76.95c-1.248-2.31-3.64-3.857-6.37-3.857S6.878 19.55 5.63 21.86a1 1 0 0 1-1.76-.951c1.575-2.915 4.618-4.906 8.13-4.906Z" />
                  </>
                )}
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
