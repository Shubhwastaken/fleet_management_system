import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Plane, MapPin, Wrench, Calendar, Activity, Users, BarChart3, Map, Shield, Cloud, Filter, Droplet, Bell, FileText, Download, Search, PenLine, AlertTriangle, CheckCircle, Clock, Truck, Navigation, Thermometer, Wind, UserCheck, ClipboardList, RotateCcw } from 'lucide-react';
import { aircraftAPI, flightsAPI, maintenanceAPI, trackingAPI, techniciansAPI, airportsAPI } from './api';
import './App.css';
import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

// Login View Component
const LoginView = ({ onLogin }) => {
  const [username, setUsername] = useState('Shubh Gupta');
  const [password, setPassword] = useState('SEPM_PRODUCT_OWNER');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Shubh Gupta' && password === 'SEPM_PRODUCT_OWNER') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#eef2ff' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#2563eb', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' }}>
          <Plane size={32} />
        </div>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 'bold' }}>Airplane Tracking & Fleet Management</h2>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>Sign in to access the system</p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Email / Mail ID</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="user@example.com"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', boxSizing: 'border-box' }}
            />
          </div>
          {error && <p style={{ color: '#ef4444', marginTop: '-10px', marginBottom: '10px', fontSize: '14px' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Log In
          </button>
        </form>
        <div style={{ marginTop: '30px', textAlign: 'left', fontSize: '12px', color: '#6b7280' }}>
          <p style={{ marginBottom: '10px' }}>Role-Based Access:</p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, lineHeight: '1.6' }}>
            <li>• Maintenance - Use email with "maint"</li>
            <li>• Records - Default role</li>
            <li>• Administrator - Use email with "admin"</li>
          </ul>
          <p style={{ marginTop: '10px' }}>Password for demo: demo123</p>
        </div>
      </div>
    </div>
  );
};

// Fuel View Component
const FuelView = () => {
  const pieData = [{ name: 'Consumed', value: 77, fill: '#3b82f6' }, { name: 'Remaining', value: 23, fill: '#f3f4f6' }];
  const barData = [
    { name: 'B737-800', fuel: 4200 },
    { name: 'A320', fuel: 3800 },
    { name: 'B777-300', fuel: 6500 },
    { name: 'A350', fuel: 5900 },
    { name: 'B787-9', fuel: 5400 },
    { name: 'A330', fuel: 5100 },
    { name: 'B737 MAX', fuel: 3900 },
    { name: 'A321neo', fuel: 4100 }
  ];

  return (
    <div className="space-y">
      <h2 className="page-title">Fuel Target Monitoring</h2>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="stat-label" style={{ color: '#1e3a8a' }}>Monthly Fuel Target</p>
              <h3 className="stat-value" style={{ margin: 0, color: '#1e3a8a' }}>50,000 L</h3>
            </div>
            <Droplet size={24} color="#3b82f6" />
          </div>
        </div>
        <div className="stat-card" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="stat-label" style={{ color: '#166534' }}>Current Fuel Usage</p>
              <h3 className="stat-value" style={{ margin: 0, color: '#166534' }}>38,500 L</h3>
            </div>
            <Activity size={24} color="#166534" />
          </div>
        </div>
        <div className="stat-card" style={{ backgroundColor: '#fff7ed', borderColor: '#fed7aa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="stat-label" style={{ color: '#9a3412' }}>Remaining Fuel Budget</p>
              <h3 className="stat-value" style={{ margin: 0, color: '#9a3412' }}>11,500 L</h3>
            </div>
            <Bell size={24} color="#9a3412" />
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="card-title">Fuel Usage vs Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={80}
                outerRadius={100}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                <tspan x="50%" dy="-0.5em" fontSize="36" fontWeight="bold">77%</tspan>
                <tspan x="50%" dy="1.5em" fontSize="14" fill="#6b7280">Consumed</tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-title">Fuel Consumption by Aircraft</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ left: 20, right: 20, top: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="bottom" />
              <Bar dataKey="fuel" fill="#3b82f6" name="Fuel (Liters)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// GateKeeper View Component
const GateKeeperView = () => (
  <div className="space-y">
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Gate Keeper Dashboard</h2>
      <p style={{ color: '#6b7280' }}>Manage your assigned gates and monitor flight status</p>
    </div>

    <div className="grid-2">
      <div className="card">
        <h3 className="card-title">My Gates</h3>
        <div className="space-y-small">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #f3f4f6', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              <span style={{ fontSize: '18px' }}>B12</span>
              <span style={{ color: '#6b7280' }}>Flight AA456</span>
            </div>
            <span style={{ backgroundColor: '#0f172a', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>On Time</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #f3f4f6', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
              <span style={{ fontSize: '18px' }}>C05</span>
              <span style={{ color: '#6b7280' }}>Flight DL789</span>
            </div>
            <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>Delayed</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #fecdd3', borderRadius: '8px', backgroundColor: '#fff1f2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
              <span style={{ fontSize: '18px', color: '#be123c' }}>A01</span>
              <span style={{ color: '#be123c' }}>Flight UA123</span>
            </div>
            <span style={{ backgroundColor: '#e11d48', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>Alert</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Alerts & Notifications</h3>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: '8px', padding: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e11d48', fontWeight: 'bold', marginBottom: '10px' }}>
            <Bell size={16} />
            <span>Gate Change!</span>
          </div>
          <p style={{ color: '#be123c', marginBottom: '15px' }}>Flight UA123 moves to Gate A01</p>

          <div style={{ backgroundColor: '#ffe4e6', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e11d48', fontWeight: 'bold', marginBottom: '5px' }}>
              <Activity size={16} />
              <span>Conflict Detected:</span>
            </div>
            <p style={{ color: '#be123c' }}>Overlaps with flight SQ321</p>
          </div>

          <button style={{ width: '100%', padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            View Conflict
          </button>
        </div>
      </div>
    </div>

    <div className="card" style={{ marginTop: '20px' }}>
      <h3 className="card-title">Quick Stats</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ color: '#10b981', fontSize: '32px', margin: 0 }}>1</h2>
          <p style={{ color: '#4b5563', margin: '5px 0 0 0' }}>On Time</p>
        </div>
        <div style={{ backgroundColor: '#fffbeb', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ color: '#f59e0b', fontSize: '32px', margin: 0 }}>1</h2>
          <p style={{ color: '#4b5563', margin: '5px 0 0 0' }}>Delayed</p>
        </div>
        <div style={{ backgroundColor: '#fff1f2', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ color: '#e11d48', fontSize: '32px', margin: 0 }}>1</h2>
          <p style={{ color: '#4b5563', margin: '5px 0 0 0' }}>Alerts</p>
        </div>
      </div>
    </div>
  </div>
);

// Fleet View Component
const FleetView = ({
  searchTerm,
  setSearchTerm,
  showAddForm,
  setShowAddForm,
  formData,
  handleInputChange,
  handleSubmit,
  formLoading,
  filteredAircraft,
  selectedAircraft,
  setSelectedAircraft,
  statusColors,
  maintenance,
  filters,
  setFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y">
      <div className="card">
        <div className="card-header">
          <h3 className="page-title">Fleet Overview</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search aircraft..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary"
              style={{ whiteSpace: 'nowrap' }}
            >
              <Filter size={16} /> {showFilters ? 'Hide Filters' : 'Filters'}
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary"
              style={{ whiteSpace: 'nowrap' }}
            >
              {showAddForm ? '✕ Cancel' : '+ Add Aircraft'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filter-panel" style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', marginTop: '10px' }}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Airline</label>
                <select
                  value={filters.airline}
                  onChange={(e) => setFilters({ ...filters, airline: e.target.value })}
                  className="form-input"
                >
                  <option value="">All Airlines</option>
                  {[...new Set(filteredAircraft.map(a => a.Airline))].map(airline => (
                    <option key={airline} value={airline}>{airline}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="form-input"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="form-input"
                >
                  <option value="">All Locations</option>
                  {[...new Set(filteredAircraft.map(a => a.Last_Known_Loc))].map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Model</label>
                <input
                  type="text"
                  placeholder="Filter by model..."
                  value={filters.model}
                  onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
            <button
              onClick={() => setFilters({ model: '', airline: '', status: '', location: '' })}
              className="btn-secondary"
              style={{ marginTop: '10px' }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {showAddForm && (
          <div className="add-form">
            <h4 className="form-title">Add New Aircraft</h4>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label className="form-label">Aircraft ID *</label>
                <input
                  type="number"
                  name="Aircraft_ID"
                  value={formData.Aircraft_ID}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., 1011"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Model *</label>
                <input
                  type="text"
                  name="Model"
                  value={formData.Model}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., Boeing 787"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Airline *</label>
                <input
                  type="text"
                  name="Airline"
                  value={formData.Airline}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., Emirates"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Capacity *</label>
                <input
                  type="number"
                  name="Capacity"
                  value={formData.Capacity}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., 300"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Manufacture Date *</label>
                <input
                  type="date"
                  name="Manufacture_Date"
                  value={formData.Manufacture_Date}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Last Known Location *</label>
                <input
                  type="text"
                  name="Last_Known_Loc"
                  value={formData.Last_Known_Loc}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., JFK Airport"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status *</label>
                <select
                  name="Status"
                  value={formData.Status}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="btn-primary"
                >
                  {formLoading ? 'Adding...' : 'Add Aircraft'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="card">
        <div className="aircraft-grid">
          {filteredAircraft.map(a => (
            <div
              key={a.Aircraft_ID}
              onClick={() => setSelectedAircraft(a)}
              className="aircraft-card"
            >
              <div className="aircraft-header">
                <div className="aircraft-icon">
                  <Plane size={24} />
                </div>
                <span className={`status-badge ${statusColors[a.Status]}`}>
                  {a.Status}
                </span>
              </div>

              <h4 className="aircraft-model">{a.Model}</h4>
              <p className="aircraft-airline">{a.Airline}</p>

              <div className="aircraft-details">
                <div className="aircraft-detail">
                  <MapPin size={16} className="icon-gray" />
                  <span>{a.Last_Known_Loc}</span>
                </div>
                <div className="aircraft-detail">
                  <Users size={16} className="icon-gray" />
                  <span>Capacity: {a.Capacity}</span>
                </div>
                <div className="aircraft-detail">
                  <Calendar size={16} className="icon-gray" />
                  <span>Mfg: {new Date(a.Manufacture_Date).getFullYear()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAircraft && (
        <div className="modal-overlay" onClick={() => setSelectedAircraft(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">{selectedAircraft.Model}</h3>
                <p className="modal-subtitle">{selectedAircraft.Airline}</p>
              </div>
              <span className={`status-badge ${statusColors[selectedAircraft.Status]}`}>
                {selectedAircraft.Status}
              </span>
            </div>

            <div className="modal-grid">
              <div>
                <p className="modal-label">Aircraft ID</p>
                <p className="modal-value">{selectedAircraft.Aircraft_ID}</p>
              </div>
              <div>
                <p className="modal-label">Capacity</p>
                <p className="modal-value">{selectedAircraft.Capacity} passengers</p>
              </div>
              <div>
                <p className="modal-label">Manufacture Date</p>
                <p className="modal-value">{selectedAircraft.Manufacture_Date}</p>
              </div>
              <div>
                <p className="modal-label">Last Known Location</p>
                <p className="modal-value">{selectedAircraft.Last_Known_Loc}</p>
              </div>
            </div>

            <div className="modal-section">
              <h4 className="section-title">Recent Activity</h4>
              <div className="space-y-small">
                {maintenance.filter(m => m.Aircraft_ID === selectedAircraft.Aircraft_ID).map(maint => (
                  <div key={maint.Maintenance_ID} className="activity-item">
                    <div className="activity-content">
                      <div>
                        <p className="activity-title">{maint.Type}</p>
                        <p className="activity-subtitle">{maint.Remark}</p>
                        <p className="activity-date">{maint.Date}</p>
                      </div>
                      <span className={`status-badge ${statusColors[maint.Status]}`}>
                        {maint.Status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setSelectedAircraft(null)} className="btn-primary btn-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


// ── De-icing Management ───────────────────────────────────────────────────────
const DeIcingView = () => {
  // Holdover time table (minutes) [fluid type][temp_bucket]
  const holdoverTable = {
    'Type I': { '>0': 10, '-3to0': 7, '-6to-3': 5, '<-6': 3 },
    'Type II': { '>0': 35, '-3to0': 25, '-6to-3': 18, '<-6': 10 },
    'Type III': { '>0': 25, '-3to0': 20, '-6to-3': 14, '<-6': 8 },
    'Type IV': { '>0': 80, '-3to0': 60, '-6to-3': 40, '<-6': 25 },
  };

  const [fluidType, setFluidType] = useState('Type I');
  const [temp, setTemp] = useState('');
  const [holdover, setHoldover] = useState(null);
  const [condition, setCondition] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, aircraft: 'A320-200', fluid: 'Type IV', temp: -4, time: '06:15', holdover: 40, tech: 'R. Singh' },
    { id: 2, aircraft: 'B737-800', fluid: 'Type II', temp: -1, time: '07:02', holdover: 25, tech: 'M. Chen' },
  ]);
  const [formAircraft, setFormAircraft] = useState('');
  const [formTech, setFormTech] = useState('');
  const [logMsg, setLogMsg] = useState('');

  const getTempBucket = (t) => {
    const n = parseFloat(t);
    if (isNaN(n)) return null;
    if (n > 0) return '>0';
    if (n >= -3) return '-3to0';
    if (n >= -6) return '-6to-3';
    return '<-6';
  };

  const calcHoldover = () => {
    const bucket = getTempBucket(temp);
    if (!bucket) return alert('Enter a valid temperature.');
    const mins = holdoverTable[fluidType][bucket];
    setHoldover(mins);
    const t = parseFloat(temp);
    if (t < -12) setCondition('⚠️ Extreme cold – de-icing not recommended below -12°C for most fluids.');
    else if (mins <= 10) setCondition('🔴 Short holdover – immediate take-off required.');
    else if (mins <= 25) setCondition('🟡 Moderate holdover – plan take-off within window.');
    else setCondition('🟢 Good holdover – comfortable window for operation.');
  };

  const addLog = () => {
    if (!formAircraft || !formTech || !temp) return alert('Please fill in aircraft, technician and temperature.');
    const bucket = getTempBucket(temp);
    const mins = holdoverTable[fluidType][bucket] || 0;
    setLogs(prev => [...prev, { id: prev.length + 1, aircraft: formAircraft, fluid: fluidType, temp: parseFloat(temp), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), holdover: mins, tech: formTech }]);
    setFormAircraft(''); setFormTech(''); setTemp(''); setHoldover(null); setCondition('');
    setLogMsg('✅ De-icing log recorded successfully.');
    setTimeout(() => setLogMsg(''), 3000);
  };

  const fluidColors = { 'Type I': '#ef4444', 'Type II': '#3b82f6', 'Type III': '#10b981', 'Type IV': '#8b5cf6' };

  return (
    <div className="space-y">
      <div>
        <h2 className="page-title" style={{ marginBottom: '4px' }}>De-icing Management</h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Log fluid types and calculate holdover times based on temperature</p>
      </div>
      {logMsg && <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '8px', padding: '12px 16px', color: '#065f46', fontWeight: '500' }}>{logMsg}</div>}

      <div className="grid-2">
        {/* Holdover Calculator */}
        <div className="card">
          <h3 className="card-title"><Thermometer size={20} className="icon-blue" /> Holdover Time Calculator</h3>
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label className="form-label">Fluid Type</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Object.keys(holdoverTable).map(ft => (
                <button key={ft} onClick={() => { setFluidType(ft); setHoldover(null); setCondition(''); }}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: `2px solid ${fluidType === ft ? fluidColors[ft] : '#e5e7eb'}`, background: fluidType === ft ? `${fluidColors[ft]}18` : 'white', color: fluidType === ft ? fluidColors[ft] : '#6b7280', fontWeight: '600', cursor: 'pointer' }}>
                  {ft}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label className="form-label">Outside Air Temperature (°C)</label>
            <input className="form-input" type="number" step="0.1" placeholder="e.g. -4" value={temp} onChange={e => { setTemp(e.target.value); setHoldover(null); setCondition(''); }} />
          </div>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '14px' }} onClick={calcHoldover}>
            <Clock size={16} /> Calculate Holdover Time
          </button>
          {holdover !== null && (
            <div style={{ background: `${fluidColors[fluidType]}12`, border: `2px solid ${fluidColors[fluidType]}`, borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>Estimated Holdover Time</p>
              <p style={{ fontSize: '42px', fontWeight: '800', color: fluidColors[fluidType] }}>{holdover}<span style={{ fontSize: '16px' }}> min</span></p>
              <p style={{ fontSize: '13px', color: '#374151', fontWeight: '500' }}>{fluidType} @ {temp}°C</p>
              {condition && <p style={{ fontSize: '13px', marginTop: '10px', color: '#4b5563' }}>{condition}</p>}
            </div>
          )}
          {/* Reference table */}
          <h4 style={{ fontWeight: '600', color: '#374151', marginTop: '16px', marginBottom: '8px', fontSize: '13px' }}>Quick Reference Table (minutes)</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead><tr style={{ background: '#f3f4f6' }}>
                <th style={{ padding: '6px 10px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Fluid</th>
                {['> 0°C', '-3 to 0', '-6 to -3', '< -6°C'].map(h => <th key={h} style={{ padding: '6px 10px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>{h}</th>)}
              </tr></thead>
              <tbody>{Object.entries(holdoverTable).map(([ft, vals]) => (
                <tr key={ft} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '6px 10px', fontWeight: '600', color: fluidColors[ft] }}>{ft}</td>
                  {Object.values(vals).map((v, i) => <td key={i} style={{ padding: '6px 10px', textAlign: 'center', color: '#374151' }}>{v}</td>)}
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>

        {/* Log De-icing Event */}
        <div className="card">
          <h3 className="card-title"><Wind size={20} className="icon-orange" /> Log De-icing Event</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Aircraft</label>
              <input className="form-input" placeholder="e.g. A320-200" value={formAircraft} onChange={e => setFormAircraft(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Fluid Type</label>
              <select className="form-input" value={fluidType} onChange={e => setFluidType(e.target.value)}>
                {Object.keys(holdoverTable).map(ft => <option key={ft}>{ft}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">OAT Temperature (°C)</label>
              <input className="form-input" type="number" step="0.1" placeholder="e.g. -5" value={temp} onChange={e => setTemp(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Technician</label>
              <input className="form-input" placeholder="e.g. R. Singh" value={formTech} onChange={e => setFormTech(e.target.value)} />
            </div>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={addLog}>
              <CheckCircle size={16} /> Record De-icing Log
            </button>
          </div>

          <h4 style={{ fontWeight: '600', color: '#374151', marginTop: '20px', marginBottom: '10px' }}>Recent Logs</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
            {[...logs].reverse().map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '13px', color: '#1f2937' }}>{l.aircraft}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{l.fluid} | {l.temp}°C | {l.time} | {l.tech}</p>
                </div>
                <span style={{ background: `${fluidColors[l.fluid]}18`, color: fluidColors[l.fluid], fontWeight: '700', fontSize: '13px', padding: '4px 10px', borderRadius: '8px' }}>{l.holdover}m</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Line Maintenance Logging ──────────────────────────────────────────────────
const LineMaintLogView = () => {
  const faultCodes = [
    { code: 'ATA-27-11', desc: 'Flight Control – Aileron', severity: 'Critical' },
    { code: 'ATA-71-00', desc: 'Power Plant – General', severity: 'Major' },
    { code: 'ATA-32-41', desc: 'Landing Gear – Wheels', severity: 'Minor' },
    { code: 'ATA-34-10', desc: 'Navigation – Flight Environment', severity: 'Major' },
    { code: 'ATA-24-11', desc: 'Electrical Power – AC Generation', severity: 'Critical' },
    { code: 'ATA-52-10', desc: 'Doors – Passenger/Crew', severity: 'Minor' },
  ];
  const [search, setSearch] = useState('');
  const [signature, setSignature] = useState('');
  const [signed, setSigned] = useState(false);
  const [efbSync, setEfbSync] = useState(false);
  const [pdfMsg, setPdfMsg] = useState('');
  const [selectedFault, setSelectedFault] = useState(null);
  const [logs] = useState([
    { id: 1, aircraft: 'Boeing 737-800', fault: 'ATA-27-11', tech: 'James Wright', date: '2026-03-10', status: 'Open' },
    { id: 2, aircraft: 'Airbus A320', fault: 'ATA-71-00', tech: 'Sara Kim', date: '2026-03-11', status: 'Closed' },
  ]);

  const filtered = faultCodes.filter(f =>
    f.code.toLowerCase().includes(search.toLowerCase()) ||
    f.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleSign = () => {
    if (!signature.trim()) return alert('Enter your name to sign.');
    setSigned(true);
  };

  const handlePdfExport = () => {
    setPdfMsg('✅ PDF certificate generated and saved to downloads.');
    setTimeout(() => setPdfMsg(''), 3000);
  };

  const handleEfbSync = () => {
    setEfbSync(true);
    setTimeout(() => setEfbSync(false), 3000);
  };

  const severityColor = (s) => s === 'Critical' ? '#ef4444' : s === 'Major' ? '#f59e0b' : '#10b981';

  return (
    <div className="space-y">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 className="page-title" style={{ marginBottom: '4px' }}>Line Maintenance Logging</h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Digital maintenance logs with signature and fault code library</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handlePdfExport} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'auto' }}>
            <Download size={16} /> Export PDF
          </button>
          <button onClick={handleEfbSync} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'auto', backgroundColor: efbSync ? '#10b981' : '#2563eb' }}>
            <RotateCcw size={16} /> {efbSync ? 'Synced with EFB ✓' : 'Sync with EFB'}
          </button>
        </div>
      </div>
      {pdfMsg && <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '8px', padding: '12px 16px', color: '#065f46', fontWeight: '500' }}>{pdfMsg}</div>}
      {/* Maintenance Logs Table */}
      <div className="card">
        <h3 className="card-title"><FileText size={20} className="icon-blue" /> Active Maintenance Logs</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['Log ID', 'Aircraft', 'Fault Code', 'Technician', 'Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px 14px', color: '#6b7280' }}>#{l.id}</td>
                  <td style={{ padding: '10px 14px', fontWeight: '500' }}>{l.aircraft}</td>
                  <td style={{ padding: '10px 14px' }}><span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '13px' }}>{l.fault}</span></td>
                  <td style={{ padding: '10px 14px', color: '#6b7280' }}>{l.tech}</td>
                  <td style={{ padding: '10px 14px', color: '#6b7280' }}>{l.date}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ background: l.status === 'Open' ? '#fef3c7' : '#d1fae5', color: l.status === 'Open' ? '#92400e' : '#065f46', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{l.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2">
        {/* Fault Code Library */}
        <div className="card">
          <h3 className="card-title"><Search size={20} className="icon-orange" /> Aircraft Fault Code Library</h3>
          <input className="search-input" style={{ width: '100%', boxSizing: 'border-box', marginBottom: '14px' }} placeholder="Search fault codes..." value={search} onChange={e => setSearch(e.target.value)} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
            {filtered.map(f => (
              <div key={f.code} onClick={() => setSelectedFault(selectedFault?.code === f.code ? null : f)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${selectedFault?.code === f.code ? '#3b82f6' : '#e5e7eb'}`, background: selectedFault?.code === f.code ? '#eff6ff' : '#f9fafb', cursor: 'pointer' }}>
                <div>
                  <span style={{ fontFamily: 'monospace', fontWeight: '600', color: '#1d4ed8', marginRight: '10px' }}>{f.code}</span>
                  <span style={{ fontSize: '13px', color: '#4b5563' }}>{f.desc}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: severityColor(f.severity), background: `${severityColor(f.severity)}18`, padding: '2px 8px', borderRadius: '10px' }}>{f.severity}</span>
              </div>
            ))}
          </div>
          {selectedFault && (
            <div style={{ marginTop: '14px', padding: '12px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <p style={{ fontWeight: '600', color: '#1d4ed8', marginBottom: '4px' }}>Selected: {selectedFault.code}</p>
              <p style={{ fontSize: '13px', color: '#374151' }}>{selectedFault.desc} — Severity: <strong>{selectedFault.severity}</strong></p>
            </div>
          )}
        </div>

        {/* Digital Signature */}
        <div className="card">
          <h3 className="card-title"><PenLine size={20} className="icon-blue" /> Digital Signature</h3>
          {!signed ? (
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '14px' }}>Type your full name to apply a digital signature to this maintenance log.</p>
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">Technician Full Name</label>
                <input className="form-input" placeholder="e.g. James Wright" value={signature} onChange={e => setSignature(e.target.value)} />
              </div>
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', marginBottom: '14px', fontStyle: 'italic', fontSize: '13px' }}>
                Signature preview: {signature && <em style={{ color: '#1d4ed8', fontSize: '22px', fontFamily: 'cursive', marginLeft: '8px' }}>{signature}</em>}
              </div>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={handleSign}>
                <PenLine size={16} /> Apply Digital Signature
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontWeight: '700', color: '#065f46', fontSize: '16px' }}>Document Signed</p>
              <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '6px' }}>Signed by: <em style={{ fontFamily: 'cursive', color: '#1d4ed8', fontSize: '18px' }}>{signature}</em></p>
              <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>{new Date().toLocaleString()}</p>
              <button className="btn-secondary" style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', margin: '14px auto 0' }} onClick={() => { setSigned(false); setSignature(''); }}>
                <RotateCcw size={14} /> Clear Signature
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Crew Shift Handover ───────────────────────────────────────────────────────
const CrewShiftHandoverView = () => {
  const [searchQ, setSearchQ] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, from: 'Alpha Crew', to: 'Beta Crew', notes: 'B737 Gate 12 – fuel leak checked, monitoring avionics.', date: '2026-03-12 06:00', claimed: false, auditTrail: ['Created by Alpha Crew at 06:00'] },
    { id: 2, from: 'Beta Crew', to: 'Gamma Crew', notes: 'A320 Gate 5 – brake inspection pending, all systems nominal.', date: '2026-03-12 14:00', claimed: false, auditTrail: ['Created by Beta Crew at 14:00'] },
  ]);
  const [newNote, setNewNote] = useState('');
  const [newFrom, setNewFrom] = useState('');
  const [newTo, setNewTo] = useState('');
  const [msg, setMsg] = useState('');

  const filtered = logs.filter(l =>
    l.notes.toLowerCase().includes(searchQ.toLowerCase()) ||
    l.from.toLowerCase().includes(searchQ.toLowerCase()) ||
    l.to.toLowerCase().includes(searchQ.toLowerCase())
  );

  const addLog = () => {
    if (!newFrom || !newTo || !newNote) return alert('Fill in all fields.');
    const now = new Date().toLocaleString();
    setLogs(prev => [...prev, { id: prev.length + 1, from: newFrom, to: newTo, notes: newNote, date: now, claimed: false, auditTrail: [`Created by ${newFrom} at ${now}`] }]);
    setNewFrom(''); setNewTo(''); setNewNote('');
    setMsg('✅ Handover log created successfully.'); setTimeout(() => setMsg(''), 3000);
  };

  const claimTask = (id) => {
    const now = new Date().toLocaleString();
    setLogs(prev => prev.map(l => l.id === id ? { ...l, claimed: true, auditTrail: [...l.auditTrail, `Task claimed at ${now}`] } : l));
  };

  return (
    <div className="space-y">
      <div>
        <h2 className="page-title" style={{ marginBottom: '4px' }}>Crew Shift Handover</h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Digital logbook for shift handover notes with audit trail</p>
      </div>
      {msg && <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '8px', padding: '12px 16px', color: '#065f46', fontWeight: '500' }}>{msg}</div>}

      <div className="grid-2">
        {/* Create Handover */}
        <div className="card">
          <h3 className="card-title"><ClipboardList size={20} className="icon-blue" /> Create Handover Log</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Outgoing Crew</label>
              <input className="form-input" placeholder="e.g. Alpha Crew" value={newFrom} onChange={e => setNewFrom(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Incoming Crew</label>
              <input className="form-input" placeholder="e.g. Beta Crew" value={newTo} onChange={e => setNewTo(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Handover Notes</label>
              <textarea className="form-input" rows={4} placeholder="Describe ongoing tasks, alerts, status..." value={newNote} onChange={e => setNewNote(e.target.value)} style={{ resize: 'vertical' }} />
            </div>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={addLog}>
              <UserCheck size={16} /> Submit Handover
            </button>
          </div>
        </div>

        {/* Log Search */}
        <div className="card">
          <h3 className="card-title"><Search size={20} className="icon-orange" /> Search Logs & Audit Trail</h3>
          <input className="search-input" style={{ width: '100%', boxSizing: 'border-box', marginBottom: '14px' }} placeholder="Search by crew or notes..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
            {filtered.map(l => (
              <div key={l.id} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '14px', background: '#f9fafb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontWeight: '700', color: '#1f2937', fontSize: '14px' }}>{l.from}</span>
                    <span style={{ color: '#6b7280', margin: '0 6px' }}>→</span>
                    <span style={{ fontWeight: '700', color: '#2563eb', fontSize: '14px' }}>{l.to}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>{l.date}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#374151', marginBottom: '10px' }}>{l.notes}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {!l.claimed ? (
                    <button onClick={() => claimTask(l.id)} style={{ padding: '5px 14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                      Claim Task
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>✓ Claimed</span>
                  )}
                  <details style={{ fontSize: '11px', color: '#6b7280' }}>
                    <summary style={{ cursor: 'pointer', color: '#4b5563', fontWeight: '500' }}>Audit Trail ({l.auditTrail.length})</summary>
                    <ul style={{ marginTop: '6px', paddingLeft: '14px' }}>{l.auditTrail.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Ground Support Equipment Locator ──────────────────────────────────────────
const GSELocatorView = () => {
  const allEquip = [
    { id: 1, name: 'Loader A1', type: 'Loader', zone: 'Ramp A', lat: 40.64, lng: -73.78, status: 'Active', maintenance: false },
    { id: 2, name: 'Loader B3', type: 'Loader', zone: 'Ramp B', lat: 40.65, lng: -73.79, status: 'Idle', maintenance: false },
    { id: 3, name: 'Fuel Truck F1', type: 'Fuel Truck', zone: 'Ramp A', lat: 40.63, lng: -73.77, status: 'Active', maintenance: false },
    { id: 4, name: 'Tug T2', type: 'Tug', zone: 'Ramp C', lat: 40.66, lng: -73.80, status: 'Maintenance', maintenance: true },
    { id: 5, name: 'Belt B2', type: 'Belt Loader', zone: 'Ramp B', lat: 40.64, lng: -73.78, status: 'Active', maintenance: false },
    { id: 6, name: 'GPU G1', type: 'GPU', zone: 'Ramp A', lat: 40.63, lng: -73.76, status: 'Idle', maintenance: false },
  ];
  const [filterType, setFilterType] = useState('All');
  const [geofenceAlerts] = useState([
    { id: 1, equip: 'Loader A1', msg: 'Entered restricted zone Ramp A-East', time: '22:15' },
    { id: 2, equip: 'Fuel Truck F1', msg: 'Left designated ramp zone', time: '22:42' },
  ]);

  const types = ['All', ...new Set(allEquip.map(e => e.type))];
  const shown = filterType === 'All' ? allEquip : allEquip.filter(e => e.type === filterType);

  const statusColor = (s) => ({ 'Active': '#10b981', 'Idle': '#f59e0b', 'Maintenance': '#ef4444' }[s] || '#6b7280');

  return (
    <div className="space-y">
      <div>
        <h2 className="page-title" style={{ marginBottom: '4px' }}>Ground Support Equipment Locator</h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Map view of all ground equipment with geofencing alerts</p>
      </div>

      {/* Geofence Alerts */}
      {geofenceAlerts.length > 0 && (
        <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '14px' }}>
          <h4 style={{ fontWeight: '700', color: '#9a3412', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={16} /> Geofencing Alerts</h4>
          {geofenceAlerts.map(a => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#7c2d12', padding: '4px 0', borderBottom: '1px solid #fed7aa' }}>
              <span><strong>{a.equip}</strong>: {a.msg}</span>
              <span style={{ color: '#9a3412' }}>{a.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: '600', color: '#374151', fontSize: '14px' }}>Filter by type:</span>
        {types.map(t => (
          <button key={t} onClick={() => setFilterType(t)}
            style={{ padding: '6px 14px', borderRadius: '8px', border: `2px solid ${filterType === t ? '#2563eb' : '#e5e7eb'}`, background: filterType === t ? '#eff6ff' : 'white', color: filterType === t ? '#1d4ed8' : '#6b7280', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid-2">
        {/* "Map" view */}
        <div className="card">
          <h3 className="card-title"><Navigation size={20} className="icon-blue" /> Ramp Map View</h3>
          <div style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)', borderRadius: '12px', height: '360px', position: 'relative', border: '2px solid #bfdbfe', overflow: 'hidden' }}>
            {/* Zone labels */}
            {['Ramp A', 'Ramp B', 'Ramp C'].map((z, i) => (
              <div key={z} style={{ position: 'absolute', top: `${15 + i * 28}%`, left: '5%', background: 'rgba(255,255,255,0.7)', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', color: '#374151' }}>{z}</div>
            ))}
            {/* Equipment dots */}
            {shown.map((eq, idx) => (
              <div key={eq.id} title={`${eq.name} – ${eq.status}`}
                style={{ position: 'absolute', left: `${20 + (idx % 3) * 28}%`, top: `${20 + Math.floor(idx / 3) * 35}%`, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: statusColor(eq.status), display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', color: 'white', fontSize: '14px' }}>
                  {eq.maintenance ? '🔧' : eq.type === 'Fuel Truck' ? '⛽' : eq.type === 'Tug' ? '🚛' : '📦'}
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', background: 'white', padding: '1px 5px', borderRadius: '4px', marginTop: '3px', color: '#1f2937', whiteSpace: 'nowrap' }}>{eq.name}</span>
              </div>
            ))}
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '11px', background: 'rgba(255,255,255,0.9)', padding: '6px 10px', borderRadius: '8px' }}>
              <span style={{ color: '#10b981' }}>● Active </span>
              <span style={{ color: '#f59e0b' }}>● Idle </span>
              <span style={{ color: '#ef4444' }}>● Maintenance</span>
            </div>
          </div>
        </div>

        {/* Equipment list */}
        <div className="card">
          <h3 className="card-title"><Truck size={20} className="icon-orange" /> Equipment List ({shown.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto' }}>
            {shown.map(eq => (
              <div key={eq.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: eq.maintenance ? '#fff1f2' : '#f9fafb', borderRadius: '8px', border: `1px solid ${eq.maintenance ? '#fecdd3' : '#e5e7eb'}` }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {eq.maintenance && <Wrench size={14} color="#ef4444" />}
                    <span style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>{eq.name}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{eq.type} · {eq.zone} · {eq.lat.toFixed(2)}°N {Math.abs(eq.lng).toFixed(2)}°W</p>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: statusColor(eq.status), background: `${statusColor(eq.status)}18`, padding: '3px 10px', borderRadius: '8px' }}>{eq.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Real Time Turnaround Tracker ──────────────────────────────────────────────
const TurnaroundTrackerView = () => {
  const milestones = [
    { id: 1, label: 'Aircraft Arrival', icon: '✈️', durationMin: 0 },
    { id: 2, label: 'Doors Open / Deboarding', icon: '🚪', durationMin: 10 },
    { id: 3, label: 'Fueling', icon: '⛽', durationMin: 25 },
    { id: 4, label: 'Catering', icon: '🍽️', durationMin: 20 },
    { id: 5, label: 'Cleaning', icon: '🧹', durationMin: 15 },
    { id: 6, label: 'Boarding', icon: '🎫', durationMin: 30 },
    { id: 7, label: 'Pushback & Departure', icon: '🛫', durationMin: 45 },
  ];

  const [flights, setFlights] = useState([
    { id: 'AA101', gate: 'B12', startTime: new Date(Date.now() - 22 * 60000), completedSteps: [1, 2, 3] },
    { id: 'DL542', gate: 'C05', startTime: new Date(Date.now() - 8 * 60000), completedSteps: [1] },
  ]);
  const [selectedFlight, setSelectedFlight] = useState('AA101');
  const [now, setNow] = useState(new Date());
  const [addFlight, setAddFlight] = useState(false);
  const [newFlightId, setNewFlightId] = useState('');
  const [newGate, setNewGate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentFlight = flights.find(f => f.id === selectedFlight);
  const elapsedMin = currentFlight ? Math.floor((now - currentFlight.startTime) / 60000) : 0;
  const totalMin = milestones[milestones.length - 1].durationMin;
  const progress = Math.min(100, Math.round((elapsedMin / totalMin) * 100));

  const toggleStep = (stepId) => {
    setFlights(prev => prev.map(f => f.id === selectedFlight
      ? { ...f, completedSteps: f.completedSteps.includes(stepId) ? f.completedSteps.filter(s => s !== stepId) : [...f.completedSteps, stepId] }
      : f));
  };

  const createFlight = () => {
    if (!newFlightId || !newGate) return alert('Enter flight ID and gate.');
    setFlights(prev => [...prev, { id: newFlightId, gate: newGate, startTime: new Date(), completedSteps: [1] }]);
    setSelectedFlight(newFlightId); setNewFlightId(''); setNewGate(''); setAddFlight(false);
  };

  const countdownSecs = currentFlight ? Math.max(0, (totalMin * 60) - Math.floor((now - currentFlight.startTime) / 1000)) : 0;
  const cdH = Math.floor(countdownSecs / 3600);
  const cdM = Math.floor((countdownSecs % 3600) / 60);
  const cdS = countdownSecs % 60;

  return (
    <div className="space-y">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 className="page-title" style={{ marginBottom: '4px' }}>Real Time Turnaround Tracker</h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Track aircraft turnaround milestones with live countdown</p>
        </div>
        <button onClick={() => setAddFlight(!addFlight)} className="btn-primary" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {addFlight ? '✕ Cancel' : '+ New Flight'}
        </button>
      </div>

      {addFlight && (
        <div className="card" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Flight ID</label>
              <input className="form-input" placeholder="e.g. UA302" value={newFlightId} onChange={e => setNewFlightId(e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Gate</label>
              <input className="form-input" placeholder="e.g. A12" value={newGate} onChange={e => setNewGate(e.target.value)} />
            </div>
            <button className="btn-primary" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={createFlight}>
              <CheckCircle size={16} /> Start Tracking
            </button>
          </div>
        </div>
      )}

      {/* Flight selector */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {flights.map(f => (
          <button key={f.id} onClick={() => setSelectedFlight(f.id)}
            style={{ padding: '8px 18px', borderRadius: '10px', border: `2px solid ${selectedFlight === f.id ? '#2563eb' : '#e5e7eb'}`, background: selectedFlight === f.id ? '#eff6ff' : 'white', color: selectedFlight === f.id ? '#1d4ed8' : '#6b7280', fontWeight: '600', cursor: 'pointer' }}>
            {f.id} — Gate {f.gate}
          </button>
        ))}
      </div>

      {currentFlight && (
        <div className="grid-2">
          {/* Countdown + progress */}
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 className="card-title" style={{ justifyContent: 'center' }}><Clock size={20} className="icon-blue" /> Turnaround Countdown</h3>
            <div style={{ fontSize: '52px', fontWeight: '800', letterSpacing: '2px', color: countdownSecs > 0 ? '#1d4ed8' : '#ef4444', fontVariantNumeric: 'tabular-nums' }}>
              {String(cdH).padStart(2, '0')}:{String(cdM).padStart(2, '0')}:{String(cdS).padStart(2, '0')}
            </div>
            <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>{countdownSecs > 0 ? 'Remaining' : '⚠️ Overrun!'}</p>
            <div style={{ margin: '16px 0 8px', background: '#e5e7eb', borderRadius: '99px', height: '12px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(to right, #3b82f6, ${progress > 80 ? '#ef4444' : '#10b981'})`, borderRadius: '99px', transition: 'width 1s linear' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>{progress}% of {totalMin} min target · {elapsedMin} min elapsed</p>
            <div style={{ marginTop: '16px', padding: '12px', background: '#f0f9ff', borderRadius: '10px' }}>
              <p style={{ fontSize: '13px', color: '#374151' }}>Flight <strong>{currentFlight.id}</strong> · Gate <strong>{currentFlight.gate}</strong></p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Started: {currentFlight.startTime.toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Milestones */}
          <div className="card">
            <h3 className="card-title"><Activity size={20} className="icon-green" /> Milestone Tracker</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {milestones.map(m => {
                const done = currentFlight.completedSteps.includes(m.id);
                return (
                  <div key={m.id} onClick={() => toggleStep(m.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${done ? '#a7f3d0' : '#e5e7eb'}`, background: done ? '#f0fdf4' : '#f9fafb', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <span style={{ fontSize: '20px' }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '600', fontSize: '13px', color: done ? '#065f46' : '#1f2937' }}>{m.label}</p>
                      <p style={{ fontSize: '11px', color: '#9ca3af' }}>Target: T+{m.durationMin} min</p>
                    </div>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${done ? '#10b981' : '#d1d5db'}`, background: done ? '#10b981' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>
                      {done ? '✓' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '10px', textAlign: 'center' }}>Click a milestone to mark/unmark as complete</p>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [aircraft, setAircraft] = useState([]);
  const [flights, setFlights] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [tracking, setTracking] = useState([]);
  const [stats, setStats] = useState({ totalAircraft: 0, activeFlights: 0, maintenance: 0, totalCapacity: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    Aircraft_ID: '',
    Model: '',
    Capacity: '',
    Manufacture_Date: '',
    Airline: '',
    Last_Known_Loc: '',
    Status: 'Active'
  });
  const [formLoading, setFormLoading] = useState(false);

  // Maintenance form states
  const [showAddMaintenanceForm, setShowAddMaintenanceForm] = useState(false);
  const [maintenanceFormData, setMaintenanceFormData] = useState({
    Aircraft_ID: '',
    Tech_ID: '',
    Type: '',
    Date: new Date().toISOString().split('T')[0],
    Status: 'Pending',
    Remark: ''
  });
  const [maintenanceFormLoading, setMaintenanceFormLoading] = useState(false);

  // Tracking form states
  const [showAddTrackingForm, setShowAddTrackingForm] = useState(false);
  const [trackingFormData, setTrackingFormData] = useState({
    Aircraft_ID: '',
    Longitude: '',
    Latitude: '',
    Altitude: '',
    Speed: '',
    Status: 'In Flight'
  });
  const [trackingFormLoading, setTrackingFormLoading] = useState(false);

  // Additional data states
  const [technicians, setTechnicians] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [airports, setAirports] = useState([]);

  // New feature states
  const [weatherData, setWeatherData] = useState({});
  const [filters, setFilters] = useState({
    model: '',
    airline: '',
    status: '',
    location: ''
  });
  const [calendarEvents, setCalendarEvents] = useState([]);

  const statusColors = {
    'Active': 'status-active',
    'Maintenance': 'status-maintenance',
    'Inactive': 'status-inactive',
    'In Flight': 'status-in-flight',
    'Completed': 'status-completed',
    'Pending': 'status-pending',
    'In Progress': 'status-in-progress'
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [aircraftRes, flightsRes, maintenanceRes, trackingRes, statsRes, techniciansRes, airportsRes] = await Promise.all([
        aircraftAPI.getAll(),
        flightsAPI.getAll(),
        maintenanceAPI.getAll(),
        trackingAPI.getAll(),
        aircraftAPI.getStats(),
        techniciansAPI.getAll(),
        airportsAPI.getAll()
      ]);

      setAircraft(aircraftRes.data);
      setFlights(flightsRes.data);
      setMaintenance(maintenanceRes.data);
      setTracking(trackingRes.data);
      setStats(statsRes.data);
      setTechnicians(techniciansRes.data);
      setAirports(airportsRes.data);
      console.log('✅ Data loaded from database successfully!');
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      setError('Failed to connect to server. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAircraft = useMemo(() =>
    aircraft.filter(a => {
      const matchesSearch = a.Model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.Airline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.Last_Known_Loc?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (!filters.model || a.Model?.toLowerCase().includes(filters.model.toLowerCase())) &&
        (!filters.airline || a.Airline === filters.airline) &&
        (!filters.status || a.Status === filters.status) &&
        (!filters.location || a.Last_Known_Loc === filters.location);

      return matchesSearch && matchesFilters;
    }), [aircraft, searchTerm, filters]
  );

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await aircraftAPI.create({
        ...formData,
        Capacity: parseInt(formData.Capacity),
        Aircraft_ID: parseInt(formData.Aircraft_ID)
      });
      alert('✅ Aircraft added successfully!');
      setShowAddForm(false);
      setFormData({
        Aircraft_ID: '',
        Model: '',
        Capacity: '',
        Manufacture_Date: '',
        Airline: '',
        Last_Known_Loc: '',
        Status: 'Active'
      });
      // Refresh the data to show the new aircraft
      await fetchData();
    } catch (error) {
      alert('❌ Failed to add aircraft: ' + (error.response?.data?.error || error.message));
    } finally {
      setFormLoading(false);
    }
  }, [formData]);

  const handleMaintenanceInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setMaintenanceFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleMaintenanceSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMaintenanceFormLoading(true);
    try {
      await maintenanceAPI.create({
        ...maintenanceFormData,
        Aircraft_ID: parseInt(maintenanceFormData.Aircraft_ID),
        Tech_ID: parseInt(maintenanceFormData.Tech_ID)
      });
      alert('✅ Maintenance record added successfully!');
      setShowAddMaintenanceForm(false);
      setMaintenanceFormData({
        Aircraft_ID: '',
        Tech_ID: '',
        Type: '',
        Date: new Date().toISOString().split('T')[0],
        Status: 'Pending',
        Remark: ''
      });
      await fetchData();
    } catch (error) {
      alert('❌ Failed to add maintenance record: ' + (error.response?.data?.error || error.message));
    } finally {
      setMaintenanceFormLoading(false);
    }
  }, [maintenanceFormData]);

  const handleTrackingInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setTrackingFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleTrackingSubmit = useCallback(async (e) => {
    e.preventDefault();
    setTrackingFormLoading(true);
    try {
      await trackingAPI.create({
        ...trackingFormData,
        Aircraft_ID: parseInt(trackingFormData.Aircraft_ID),
        Longitude: parseFloat(trackingFormData.Longitude),
        Latitude: parseFloat(trackingFormData.Latitude),
        Altitude: parseInt(trackingFormData.Altitude),
        Speed: parseInt(trackingFormData.Speed),
        Timestamp: new Date().toISOString()
      });
      alert('✅ Tracking log added successfully!');
      setShowAddTrackingForm(false);
      setTrackingFormData({
        Aircraft_ID: '',
        Longitude: '',
        Latitude: '',
        Altitude: '',
        Speed: '',
        Status: 'In Flight'
      });
      await fetchData();
    } catch (error) {
      alert('❌ Failed to add tracking log: ' + (error.response?.data?.error || error.message));
    } finally {
      setTrackingFormLoading(false);
    }
  }, [trackingFormData]);

  // Weather API Integration
  const fetchWeather = async (location) => {
    try {
      const apiKey = '8b86052e9d93f7307b16bef61f05b3bf'; // OpenWeatherMap API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Weather fetch error:', error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch weather for unique locations
    const uniqueLocations = [...new Set(aircraft.map(a => a.Last_Known_Loc?.split(' ')[0]))];
    uniqueLocations.forEach(async (loc) => {
      if (loc && !weatherData[loc]) {
        const weather = await fetchWeather(loc);
        if (weather) {
          setWeatherData(prev => ({ ...prev, [loc]: weather }));
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aircraft]);

  // Prepare calendar events
  useEffect(() => {
    const events = [];

    // Add flight events
    flights.forEach(flight => {
      events.push({
        title: `Flight: ${flight.Model}`,
        start: new Date(),
        end: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours later
        type: 'flight',
        data: flight
      });
    });

    // Add maintenance events
    maintenance.forEach(maint => {
      const date = new Date(maint.Date);
      events.push({
        title: `Maintenance: ${maint.Type}`,
        start: date,
        end: new Date(date.getTime() + 4 * 60 * 60 * 1000), // 4 hours later
        type: 'maintenance',
        data: maint
      });
    });

    setCalendarEvents(events);
  }, [flights, maintenance]);

  // Chart data preparation
  const getStatusChartData = () => {
    const statusCount = aircraft.reduce((acc, a) => {
      acc[a.Status] = (acc[a.Status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  };

  const getMaintenanceChartData = () => {
    const typeCount = maintenance.reduce((acc, m) => {
      acc[m.Type] = (acc[m.Type] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(typeCount).map(([name, count]) => ({ name, count }));
  };

  const getFlightTrendsData = () => {
    const dates = [...new Set(flights.map(f => f.Destination))];
    return dates.slice(0, 7).map(dest => ({
      destination: dest,
      flights: flights.filter(f => f.Destination === dest).length
    }));
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const DashboardView = () => (
    <div className="space-y">
      <div className="stats-grid">
        <div className="stat-card stat-blue">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total Fleet</p>
              <p className="stat-value">{stats.totalAircraft}</p>
            </div>
            <div className="stat-icon stat-icon-blue">
              <Plane size={32} />
            </div>
          </div>
        </div>

        <div className="stat-card stat-green">
          <div className="stat-content">
            <div>
              <p className="stat-label">Active Aircraft</p>
              <p className="stat-value">{stats.activeFlights}</p>
            </div>
            <div className="stat-icon stat-icon-green">
              <Activity size={32} />
            </div>
          </div>
        </div>

        <div className="stat-card stat-orange">
          <div className="stat-content">
            <div>
              <p className="stat-label">In Maintenance</p>
              <p className="stat-value">{stats.maintenance}</p>
            </div>
            <div className="stat-icon stat-icon-orange">
              <Wrench size={32} />
            </div>
          </div>
        </div>

        <div className="stat-card stat-purple">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total Capacity</p>
              <p className="stat-value">{stats.totalCapacity}</p>
            </div>
            <div className="stat-icon stat-icon-purple">
              <Users size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid-3">
        <div className="card">
          <h3 className="card-title">
            <BarChart3 size={20} className="icon-blue" />
            Fleet Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={getStatusChartData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {getStatusChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-title">
            <Activity size={20} className="icon-green" />
            Flight Trends
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={getFlightTrendsData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="destination" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="flights" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-title">
            <Wrench size={20} className="icon-orange" />
            Maintenance by Type
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getMaintenanceChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="card-title">
            <Activity size={20} className="icon-blue" />
            Active Flights
          </h3>
          <div className="space-y-small">
            {flights.slice(0, 4).map(flight => (
              <div key={flight.Flight_ID} className="list-item">
                <div className="list-item-content">
                  <div>
                    <p className="list-item-title">{flight.Model}</p>
                    <p className="list-item-subtitle">{flight.Origin} → {flight.Destination}</p>
                  </div>
                  <span className={`status-badge ${statusColors[flight.Attribute === 'International' ? 'In Flight' : 'Active']}`}>
                    {flight.Attribute}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">
            <Wrench size={20} className="icon-orange" />
            Maintenance Schedule
          </h3>
          <div className="space-y-small">
            {maintenance.slice(-4).map(maint => (
              <div key={maint.Maintenance_ID} className="list-item">
                <div className="list-item-content">
                  <div>
                    <p className="list-item-title">{maint.Model}</p>
                    <p className="list-item-subtitle">{maint.Type}</p>
                    <p className="list-item-date">{maint.Date}</p>
                  </div>
                  <span className={`status-badge ${statusColors[maint.Status]}`}>
                    {maint.Status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TrackingView = () => (
    <div className="space-y">
      <div className="card">
        <div className="card-header">
          <h3 className="page-title">
            <Map size={24} className="icon-blue" style={{ display: 'inline', marginRight: '10px' }} />
            Real-Time Tracking
          </h3>
          <button
            onClick={() => setShowAddTrackingForm(!showAddTrackingForm)}
            className="btn-primary"
            style={{ whiteSpace: 'nowrap' }}
          >
            {showAddTrackingForm ? '✕ Cancel' : '+ Add Tracking Log'}
          </button>
        </div>

        {showAddTrackingForm && (
          <div className="add-form">
            <h4 className="form-title">Add New Tracking Log</h4>
            <form onSubmit={handleTrackingSubmit} className="form-grid">
              <div className="form-group">
                <label className="form-label">Aircraft *</label>
                <select
                  name="Aircraft_ID"
                  value={trackingFormData.Aircraft_ID}
                  onChange={handleTrackingInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Aircraft</option>
                  {aircraft.map(a => (
                    <option key={a.Aircraft_ID} value={a.Aircraft_ID}>
                      {a.Model} - {a.Airline} (ID: {a.Aircraft_ID})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Longitude *</label>
                <input
                  type="number"
                  step="0.000001"
                  name="Longitude"
                  value={trackingFormData.Longitude}
                  onChange={handleTrackingInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., -74.006"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Latitude *</label>
                <input
                  type="number"
                  step="0.000001"
                  name="Latitude"
                  value={trackingFormData.Latitude}
                  onChange={handleTrackingInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., 40.7128"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Altitude (ft) *</label>
                <input
                  type="number"
                  name="Altitude"
                  value={trackingFormData.Altitude}
                  onChange={handleTrackingInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., 35000"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Speed (km/h) *</label>
                <input
                  type="number"
                  name="Speed"
                  value={trackingFormData.Speed}
                  onChange={handleTrackingInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., 850"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status *</label>
                <select
                  name="Status"
                  value={trackingFormData.Status}
                  onChange={handleTrackingInputChange}
                  required
                  className="form-input"
                >
                  <option value="In Flight">In Flight</option>
                  <option value="Landed">Landed</option>
                  <option value="Taxiing">Taxiing</option>
                  <option value="Taking Off">Taking Off</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={trackingFormLoading}
                  className="btn-primary"
                >
                  {trackingFormLoading ? 'Adding...' : 'Add Tracking Log'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTrackingForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="card">
        <div className="space-y">
          {tracking.map(track => {
            const a = aircraft.find(ac => ac.Aircraft_ID === track.Aircraft_ID);
            return (
              <div key={track.Tracking_ID} className="tracking-card">
                <div className="tracking-header">
                  <div>
                    <h4 className="tracking-title">{a?.Model}</h4>
                    <p className="tracking-subtitle">{a?.Airline}</p>
                  </div>
                  <span className={`status-badge ${statusColors[track.Status]}`}>
                    {track.Status}
                  </span>
                </div>

                <div className="tracking-grid">
                  <div>
                    <p className="tracking-label">Speed</p>
                    <p className="tracking-value">{track.Speed} km/h</p>
                  </div>
                  <div>
                    <p className="tracking-label">Altitude</p>
                    <p className="tracking-value">{track.Altitude} ft</p>
                  </div>
                  <div>
                    <p className="tracking-label">Coordinates</p>
                    <p className="tracking-value-sm">{track.Latitude?.toFixed(2)}, {track.Longitude?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="tracking-label">Last Update</p>
                    <p className="tracking-value-sm">{new Date(track.Timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const MaintenanceView = () => (
    <div className="space-y">
      <div className="card">
        <div className="card-header">
          <h3 className="page-title">
            <Wrench size={24} className="icon-orange" style={{ display: 'inline', marginRight: '10px' }} />
            Maintenance Management
          </h3>
          <button
            onClick={() => setShowAddMaintenanceForm(!showAddMaintenanceForm)}
            className="btn-primary"
            style={{ whiteSpace: 'nowrap' }}
          >
            {showAddMaintenanceForm ? '✕ Cancel' : '+ Add Maintenance'}
          </button>
        </div>

        {showAddMaintenanceForm && (
          <div className="add-form">
            <h4 className="form-title">Add New Maintenance Record</h4>
            <form onSubmit={handleMaintenanceSubmit} className="form-grid">
              <div className="form-group">
                <label className="form-label">Aircraft *</label>
                <select
                  name="Aircraft_ID"
                  value={maintenanceFormData.Aircraft_ID}
                  onChange={handleMaintenanceInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Aircraft</option>
                  {aircraft.map(a => (
                    <option key={a.Aircraft_ID} value={a.Aircraft_ID}>
                      {a.Model} - {a.Airline} (ID: {a.Aircraft_ID})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Technician *</label>
                <select
                  name="Tech_ID"
                  value={maintenanceFormData.Tech_ID}
                  onChange={handleMaintenanceInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Technician</option>
                  {technicians.map(t => (
                    <option key={t.Tech_ID} value={t.Tech_ID}>
                      {t.Name} - {t.Specialization} (ID: {t.Tech_ID})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Type *</label>
                <select
                  name="Type"
                  value={maintenanceFormData.Type}
                  onChange={handleMaintenanceInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Type</option>
                  <option value="Routine">Routine</option>
                  <option value="Engine">Engine</option>
                  <option value="Avionics">Avionics</option>
                  <option value="Hydraulics">Hydraulics</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  name="Date"
                  value={maintenanceFormData.Date}
                  onChange={handleMaintenanceInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status *</label>
                <select
                  name="Status"
                  value={maintenanceFormData.Status}
                  onChange={handleMaintenanceInputChange}
                  required
                  className="form-input"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Remark *</label>
                <input
                  type="text"
                  name="Remark"
                  value={maintenanceFormData.Remark}
                  onChange={handleMaintenanceInputChange}
                  required
                  className="form-input"
                  placeholder="Enter maintenance remarks"
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={maintenanceFormLoading}
                  className="btn-primary"
                >
                  {maintenanceFormLoading ? 'Adding...' : 'Add Maintenance'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMaintenanceForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="card">
        <div className="space-y">
          {maintenance.map(maint => (
            <div key={maint.Maintenance_ID} className="maintenance-card">
              <div className="maintenance-header">
                <div>
                  <h4 className="maintenance-title">{maint.Type}</h4>
                  <p className="maintenance-subtitle">{maint.Model} - {maint.Airline}</p>
                </div>
                <span className={`status-badge ${statusColors[maint.Status]}`}>
                  {maint.Status}
                </span>
              </div>

              <p className="maintenance-remark">{maint.Remark}</p>

              <div className="maintenance-footer">
                <div className="maintenance-info">
                  <Calendar size={16} />
                  <span>{maint.Date}</span>
                </div>
                <div className="maintenance-info">
                  <Users size={16} />
                  <span>Technician: {maint.Technician_Name || `ID: ${maint.Tech_ID}`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );



  // Calendar View Component
  const CalendarView = () => {
    const eventStyleGetter = (event) => {
      const backgroundColor = event.type === 'flight' ? '#3b82f6' : '#f59e0b';
      return {
        style: {
          backgroundColor,
          borderRadius: '5px',
          opacity: 0.8,
          color: 'white',
          border: '0px',
          display: 'block'
        }
      };
    };

    return (
      <div className="space-y">
        <div className="card">
          <h3 className="card-title">
            <Calendar size={24} className="icon-blue" />
            Flight & Maintenance Schedule
          </h3>
          <div style={{ height: '600px', padding: '20px' }}>
            <BigCalendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day', 'agenda']}
              defaultView="month"
            />
          </div>
        </div>
      </div>
    );
  };

  // Maintenance Timeline View Component
  const TimelineView = () => {
    const sortedMaintenance = [...maintenance].sort((a, b) => new Date(b.Date) - new Date(a.Date));

    return (
      <div className="space-y">
        <div className="card">
          <h3 className="card-title">
            <Wrench size={24} className="icon-orange" />
            Maintenance History Timeline
          </h3>

          <div className="timeline">
            {sortedMaintenance.map((maint, idx) => (
              <div key={maint.Maintenance_ID} className="timeline-item">
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4 className="timeline-title">{maint.Model} - {maint.Type}</h4>
                    <span className={`status-badge ${statusColors[maint.Status]}`}>
                      {maint.Status}
                    </span>
                  </div>
                  <p className="timeline-date">
                    <Calendar size={14} /> {new Date(maint.Date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="timeline-detail">
                    <Users size={14} /> Technician ID: {maint.Tech_ID}
                  </p>
                  {maint.Remark && (
                    <p className="timeline-remark">"{maint.Remark}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Weather View Component (integrated)
  // eslint-disable-next-line no-unused-vars
  const WeatherPanel = ({ location }) => {
    const weather = weatherData[location?.split(' ')[0]];
    if (!weather) return null;

    return (
      <div className="weather-card">
        <div className="weather-header">
          <Cloud size={20} className="icon-blue" />
          <span>{weather.name}</span>
        </div>
        <div className="weather-content">
          <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather-desc">{weather.weather[0].description}</div>
          <div className="weather-details">
            <span>💨 {weather.wind.speed} m/s</span>
            <span>💧 {weather.main.humidity}%</span>
          </div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading data from database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Connection Error</h2>
          <p className="error-message">{error}</p>
          <div className="error-details">
            <p className="error-details-title">Make sure:</p>
            <ul className="error-list">
              <li>Backend server is running: <code>npm run server</code></li>
              <li>Database is set up and running</li>
              <li>.env file has correct credentials</li>
              <li>MySQL is running on your system</li>
            </ul>
          </div>
          <button onClick={fetchData} className="btn-primary">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-brand">
              <div className="brand-icon">
                <Plane size={24} />
              </div>
              <h1 className="brand-title">Aviation Fleet Management</h1>
            </div>
            <div className="nav-status">
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-online">Connected to Database</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="tabs">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'gatekeeper', label: 'Gatekeeper', icon: Shield },
            { id: 'fleet', label: 'Fleet', icon: Plane },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'timeline', label: 'Timeline', icon: Activity },
            { id: 'tracking', label: 'Tracking', icon: Map },
            { id: 'maintenance', label: 'Maintenance', icon: Wrench },
            { id: 'fuel', label: 'Fuel', icon: Droplet },
            { id: 'line-maint', label: 'Line Maint.', icon: FileText },
            { id: 'deicing', label: 'De-icing', icon: Thermometer },
            { id: 'crew-handover', label: 'Crew Handover', icon: UserCheck },
            { id: 'gse-locator', label: 'GSE Locator', icon: Truck },
            { id: 'turnaround', label: 'Turnaround', icon: Clock },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'gatekeeper' && <GateKeeperView />}
        {activeTab === 'fuel' && <FuelView />}
        {activeTab === 'fleet' && <FleetView
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formLoading={formLoading}
          filteredAircraft={filteredAircraft}
          selectedAircraft={selectedAircraft}
          setSelectedAircraft={setSelectedAircraft}
          statusColors={statusColors}
          maintenance={maintenance}
          filters={filters}
          setFilters={setFilters}
        />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'timeline' && <TimelineView />}
        {activeTab === 'tracking' && <TrackingView />}
        {activeTab === 'maintenance' && <MaintenanceView />}
        {activeTab === 'line-maint' && <LineMaintLogView />}
        {activeTab === 'deicing' && <DeIcingView />}
        {activeTab === 'crew-handover' && <CrewShiftHandoverView />}
        {activeTab === 'gse-locator' && <GSELocatorView />}
        {activeTab === 'turnaround' && <TurnaroundTrackerView />}
      </div>
    </div>
  );
};

export default App;
