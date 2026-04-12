import { useState } from 'react'
import { scheduleData } from './data/schedule'
import './index.css'

function App() {
  const [viewState, setViewState] = useState('home');
  const [trackFilter, setTrackFilter] = useState('all');

  const openSlide = (index) => {
    setViewState(index);
    setTrackFilter('all');
  };

  const goHome = () => {
    setViewState('home');
  };

  const renderTimeline = () => {
    return (
      <div className="timeline-container slide">
        <h1 className="timeline-title">素问大健康倒推实战总览 (W1 - W10)</h1>
        <div className="timeline-line"></div>
        <div className="timeline-nodes-wrapper">
          {scheduleData.map((data, index) => (
            <div 
              key={index} 
              className={`timeline-node-card ${index === 4 ? 'highlight-node' : ''}`}
              onClick={() => openSlide(index)}
            >
              <div className="node-indicator"></div>
              <div className="node-content">
                <div className="node-week">{data.week}</div>
                <div className="node-title">{data.title}</div>
                <div className="node-tagline">{data.tagline}</div>
                <div className="node-date">{data.dateRange}</div>
                
                <div className="node-key-actions">
                  <div className="key-action item-product">
                    <span className="key-icon">⚙️</span>
                    <span className="key-text">{data.productKey}</span>
                  </div>
                  <div className="key-action item-ecom">
                    <span className="key-icon">🛒</span>
                    <span className="key-text">{data.ecomKey}</span>
                  </div>
                  <div className="key-action item-op">
                    <span className="key-icon">🚀</span>
                    <span className="key-text">{data.opKey}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCheckboxes = (tasks, typeColor) => {
    return tasks.map((task, i) => {
      // Basic markdown bold parser: **text** -> <span className="highlight-text">text</span>
      const parts = task.split(/\*\*(.*?)\*\*/g);
      
      return (
        <label key={i} className={`checkbox-item ${typeColor}`}>
          <input type="checkbox" />
          <span className="checkmark"></span>
          <span className="task-text">
            {parts.map((part, index) => 
              index % 2 === 1 ? <span key={index} className="key-highlight">{part}</span> : part
            )}
          </span>
        </label>
      );
    });
  };

  const renderSlide = (index) => {
    const data = scheduleData[index];
    
    const getColumnStyle = (track) => {
      if (trackFilter === 'all') return { display: 'flex' };
      if (trackFilter === track) return { display: 'flex', gridColumn: '1 / -1' };
      return { display: 'none' };
    };

    return (
      <div className="slide detail-slide" key={index}>
        <button 
          className="nav-arrow prev-arrow" 
          onClick={() => openSlide(index - 1)} 
          disabled={index === 0}
        >
          &#10094;
        </button>
        <button 
          className="nav-arrow next-arrow" 
          onClick={() => openSlide(index + 1)} 
          disabled={index === scheduleData.length - 1}
        >
          &#10095;
        </button>

        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '2rem' }}>
          <button className="btn back-btn" onClick={goHome} style={{ marginBottom: 0 }}>← 返回全景时间轴</button>
        </div>
        
        <div className="header">
          <h2>{data.dateRange} <span className="highlight-text">({data.tagline})</span></h2>
          <h1>{data.week} : {data.title}</h1>
        </div>
        
        <div className="filter-tabs">
          <button className={`tab-btn ${trackFilter === 'all' ? 'active' : ''}`} onClick={() => setTrackFilter('all')}>全景视图</button>
          <button className={`tab-btn ${trackFilter === 'product' ? 'active' : ''}`} onClick={() => setTrackFilter('product')}>产品</button>
          <button className={`tab-btn ${trackFilter === 'ecom' ? 'active' : ''}`} onClick={() => setTrackFilter('ecom')}>电商</button>
          <button className={`tab-btn ${trackFilter === 'operation' ? 'active' : ''}`} onClick={() => setTrackFilter('operation')}>运营</button>
        </div>

        <div className="card">
          <div className="week-indicator">{data.week}</div>
          
          <div className="task-grid" style={{
            gridTemplateColumns: trackFilter === 'all' ? 'repeat(3, 1fr)' : '1fr'
          }}>
            <div className="task-column" style={getColumnStyle('product')}>
              <div className="task-title track-product">
                <span role="img" aria-label="product">⚙️</span>
                产品研发核心线
              </div>
              <div className="task-content">
                {renderCheckboxes(data.productTasks, 'product-check')}
              </div>
            </div>
            
            <div className="task-column" style={getColumnStyle('ecom')}>
              <div className="task-title track-ecom">
                <span role="img" aria-label="ecommerce">🛒</span>
                电商节点筹备线
              </div>
              <div className="task-content">
                {renderCheckboxes(data.ecomTasks, 'ecom-check')}
              </div>
            </div>
            
            <div className="task-column" style={getColumnStyle('operation')}>
              <div className="task-title track-operation">
                <span role="img" aria-label="operation">🚀</span>
                运营与公关投放线
              </div>
              <div className="task-content">
                {renderCheckboxes(data.operationTasks, 'operation-check')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="presentation-container">
      <div className="bg-glow"></div>
      <div className="bg-glow-2"></div>

      {viewState === 'home' ? renderTimeline() : renderSlide(viewState)}
    </div>
  )
}

export default App
