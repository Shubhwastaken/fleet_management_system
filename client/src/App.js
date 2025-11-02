import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Plane, MapPin, Wrench, Calendar, Activity, Users, BarChart3, Map, Database, Shield } from 'lucide-react';
import { aircraftAPI, flightsAPI, maintenanceAPI, trackingAPI, tclAPI, dclAPI, techniciansAPI, airportsAPI } from './api';
import './App.css';

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
  maintenance
}) => {
  return (
    <div className="space-y">
      <div className="card">
        <div className="card-header">
          <h3 className="page-title">Fleet Overview</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Search aircraft..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="btn-primary"
              style={{ whiteSpace: 'nowrap' }}
            >
              {showAddForm ? '✕ Cancel' : '+ Add Aircraft'}
            </button>
          </div>
        </div>

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


const App = () => {
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
  const [airports, setAirports] = useState([]);

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
    aircraft.filter(a =>
      a.Model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.Airline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.Last_Known_Loc?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [aircraft, searchTerm]
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

  const TCLView = () => {
    const [tclResult, setTclResult] = useState(null);
    const [tclLoading, setTclLoading] = useState(false);

    const executeTCLDemo = async (demoType) => {
      setTclLoading(true);
      setTclResult(null);
      try {
        let response;
        switch (demoType) {
          case 'rollback':
            response = await tclAPI.demoRollback();
            break;
          case 'savepoint':
            response = await tclAPI.demoSavepoint();
            break;
          default:
            response = await tclAPI.demoRollback();
        }
        setTclResult(response.data);
        alert('TCL operation executed successfully! Check the result below.');
      } catch (error) {
        setTclResult({ error: error.message });
        alert('TCL operation failed: ' + error.message);
      } finally {
        setTclLoading(false);
      }
    };

    return (
      <div className="card">
        <h3 className="card-title">
          <Database size={24} className="icon-blue" />
          TCL (Transaction Control Language) Operations
        </h3>
        
        <div className="tcl-grid">
          <div className="tcl-card">
            <h4 className="tcl-title">Rollback Demo</h4>
            <p className="tcl-description">
              Demonstrates automatic rollback on error. Attempts to insert duplicate data and rolls back the transaction.
            </p>
            <button 
              onClick={() => executeTCLDemo('rollback')} 
              disabled={tclLoading}
              className="btn-primary"
            >
              Execute Rollback Demo
            </button>
          </div>

          <div className="tcl-card">
            <h4 className="tcl-title">Savepoint Demo</h4>
            <p className="tcl-description">
              Demonstrates SAVEPOINT usage. Inserts two records, creates a savepoint, then rolls back to it.
            </p>
            <button 
              onClick={() => executeTCLDemo('savepoint')} 
              disabled={tclLoading}
              className="btn-primary"
            >
              Execute Savepoint Demo
            </button>
          </div>
        </div>

        {tclResult && (
          <div className={`result-box ${tclResult.error ? 'result-error' : 'result-success'}`}>
            <h4 className="result-title">
              {tclResult.error ? '❌ Error' : '✅ Success'}
            </h4>
            <pre className="result-content">{JSON.stringify(tclResult, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  const DCLView = () => {
    const [dclResult, setDclResult] = useState(null);
    const [dclLoading, setDclLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const executeDCLDemo = async (demoType) => {
      setDclLoading(true);
      setDclResult(null);
      try {
        let response;
        switch (demoType) {
          case 'aircraft-manager':
            response = await dclAPI.demoCreateAircraftManager();
            break;
          case 'readonly':
            response = await dclAPI.demoCreateReadonlyUser();
            break;
          case 'technician':
            response = await dclAPI.demoCreateTechnicianUser();
            break;
          case 'list-users':
            response = await dclAPI.listUsers();
            setUsers(response.data.users || []);
            break;
          default:
            response = await dclAPI.demoCreateReadonlyUser();
        }
        setDclResult(response.data);
        alert('DCL operation executed successfully! Check the result below.');
      } catch (error) {
        setDclResult({ error: error.message });
        alert('DCL operation failed: ' + error.message);
      } finally {
        setDclLoading(false);
      }
    };

    return (
      <div className="card">
        <h3 className="card-title">
          <Shield size={24} className="icon-purple" />
          DCL (Data Control Language) Operations
        </h3>
        
        <div className="dcl-grid">
          <div className="dcl-card">
            <h4 className="dcl-title">Aircraft Manager User</h4>
            <p className="dcl-description">
              Creates user with SELECT, INSERT, UPDATE privileges on aircraft table.
            </p>
            <button 
              onClick={() => executeDCLDemo('aircraft-manager')} 
              disabled={dclLoading}
              className="btn-primary"
            >
              Create Aircraft Manager
            </button>
          </div>

          <div className="dcl-card">
            <h4 className="dcl-title">Read-Only User</h4>
            <p className="dcl-description">
              Creates user with only SELECT privileges on all tables.
            </p>
            <button 
              onClick={() => executeDCLDemo('readonly')} 
              disabled={dclLoading}
              className="btn-primary"
            >
              Create Read-Only User
            </button>
          </div>

          <div className="dcl-card">
            <h4 className="dcl-title">Technician User</h4>
            <p className="dcl-description">
              Creates user with maintenance management privileges.
            </p>
            <button 
              onClick={() => executeDCLDemo('technician')} 
              disabled={dclLoading}
              className="btn-primary"
            >
              Create Technician User
            </button>
          </div>

          <div className="dcl-card">
            <h4 className="dcl-title">List All Users</h4>
            <p className="dcl-description">
              Shows all database users and their hosts.
            </p>
            <button 
              onClick={() => executeDCLDemo('list-users')} 
              disabled={dclLoading}
              className="btn-primary"
            >
              List Users
            </button>
          </div>
        </div>

        {dclResult && (
          <div className={`result-box ${dclResult.error ? 'result-error' : 'result-success'}`}>
            <h4 className="result-title">
              {dclResult.error ? '❌ Error' : '✅ Success'}
            </h4>
            <pre className="result-content">{JSON.stringify(dclResult, null, 2)}</pre>
          </div>
        )}

        {users.length > 0 && (
          <div className="users-table">
            <h4 className="section-title">Database Users</h4>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Host</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.User}</td>
                    <td>{user.Host}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

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
            { id: 'fleet', label: 'Fleet', icon: Plane },
            { id: 'tracking', label: 'Tracking', icon: Map },
            { id: 'maintenance', label: 'Maintenance', icon: Wrench },
            { id: 'tcl', label: 'TCL', icon: Database },
            { id: 'dcl', label: 'DCL', icon: Shield }
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
        />}
        {activeTab === 'tracking' && <TrackingView />}
        {activeTab === 'maintenance' && <MaintenanceView />}
        {activeTab === 'tcl' && <TCLView />}
        {activeTab === 'dcl' && <DCLView />}
      </div>
    </div>
  );
};

export default App;
